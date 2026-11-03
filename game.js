// game.js - Complete Flamecraft Rules & Interaction Engine
import {
  GOODS,
  GOOD_LABELS,
  ARTISAN_ABILITIES,
  STARTER_DRAGONS,
  REGULAR_DRAGONS,
  STARTER_SHOPS,
  TOWN_SHOPS,
  ENCHANTMENTS,
  FANCY_DRAGONS
} from './data.js';

const PLAYER_COLORS = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad'];
const PLAYER_NAMES = ['Red Flamekeeper', 'Blue Flamekeeper', 'Green Flamekeeper', 'Purple Flamekeeper'];

// Load SVG sprite sheet into DOM
async function loadSprites() {
  const container = document.getElementById('svg-sprite-container');
  try {
    const res = await fetch('assets/icons.svg');
    if (res.ok) {
      container.innerHTML = await res.text();
      return;
    }
  } catch (_) {
    // Fallback if opened directly via file:// protocol
  }
}

function iconHTML(type, size = 'sm') {
  const map = {
    bread: 'icon-bread',
    meat: 'icon-meat',
    iron: 'icon-iron',
    crystal: 'icon-crystal',
    plant: 'icon-plant',
    potion: 'icon-potion',
    coin: 'icon-coin',
    coin3: 'icon-coin',
    heart: 'icon-heart',
    wild: 'icon-wild',
    dragon: 'icon-dragon',
    fancy: 'icon-fancy',
    sun: 'icon-sun',
    moon: 'icon-moon',
    nocoin: 'icon-no-coin'
  };
  const id = map[type] || 'icon-wild';
  return `<svg class="icon ${size}" title="${GOOD_LABELS[type] || type}"><use href="#${id}"></use></svg>`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class FlamecraftGame {
  constructor() {
    this.state = null;
    this.bindStaticEvents();
    this.startNewGame();
  }

  bindStaticEvents() {
    document.getElementById('btn-new-game').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-rules').addEventListener('click', () => {
      document.getElementById('rules-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-rules').addEventListener('click', () => {
      document.getElementById('rules-modal').classList.add('hidden');
    });
  }

  startNewGame() {
    const playerCount = parseInt(document.getElementById('player-count-select').value, 10);
    const mode = document.getElementById('mode-select').value;
    const deckColor = document.getElementById('deck-select').value;

    // 1. Build Artisan Dragon Deck per player count rules:
    // 2P: remove 2 sets (4 of each type = 24 cards)
    // 3P: remove 1 set (5 of each type = 30 cards)
    // 4P+: use all 6 sets (36 cards)
    const maxSet = playerCount === 2 ? 4 : playerCount === 3 ? 5 : 6;
    const filteredArtisans = REGULAR_DRAGONS.filter(d => d.set <= maxSet).map(d => ({ ...d, goodsOnCard: {} }));
    const artisanDeck = shuffle(filteredArtisans);

    // 2. Build 10-card Shop Deck: 1 random from each of the 6 Goods piles + 4 from the 7th Special pile
    const shopDeckCards = [];
    GOODS.forEach(g => {
      const pile = shuffle(TOWN_SHOPS.filter(s => s.pile === g));
      if (pile[0]) shopDeckCards.push(pile[0]);
    });
    const specialPile = shuffle(TOWN_SHOPS.filter(s => s.pile === 'special'));
    shopDeckCards.push(...specialPile.slice(0, 4));
    const shopDeck = shuffle(shopDeckCards);

    // 3. Setup 6 Starter Shops with matching Starter Artisan Dragons in slot 0
    const town = shuffle(STARTER_SHOPS).map(shop => {
      const starterDragon = STARTER_DRAGONS.find(d => d.type === shop.type);
      return {
        ...shop,
        slots: shop.slots.map(s => ({ ...s })),
        dragons: [{ ...starterDragon }, null, null],
        enchantments: [],
        facedown: false,
        alleyCoins: 0,
        lastFiredDragon: null
      };
    });

    // 4. Shuffle Enchantment Deck & Fancy Dragon Deck
    const enchantmentDeck = shuffle(ENCHANTMENTS[deckColor].map(e => ({ ...e })));
    const fancyDeck = shuffle(FANCY_DRAGONS.map(f => ({ ...f, scored: false })));

    // 5. Reveal 5 Park Dragons & 5 Enchantments
    const park = artisanDeck.splice(0, 5);
    const enchantmentRow = enchantmentDeck.splice(0, 5);

    // 6. Initialize Players (3 Artisan Dragons + draw 2 Fancy Dragons & keep 1; 4th player gets +1 Good)
    const players = [];
    for (let i = 0; i < playerCount; i++) {
      const hand = artisanDeck.splice(0, 3);
      const fancyChoices = fancyDeck.splice(0, 2);
      const goods = { bread: 0, meat: 0, iron: 0, crystal: 0, plant: 0, potion: 0 };
      if (i === 3) goods.bread = 1; // 4th player starting bonus Good
      players.push({
        id: i,
        name: PLAYER_NAMES[i],
        color: PLAYER_COLORS[i],
        isAI: mode === 'ai' && i > 0,
        reputation: 0,
        coins: 0,
        goods,
        hand,
        fancy: [fancyChoices[0]], // Keep 1st Fancy Dragon, return 2nd to bottom of deck
        reservedEnchantment: null,
        shopIndex: null
      });
      if (fancyChoices[1]) fancyDeck.push(fancyChoices[1]);
    }

    this.state = {
      playerCount,
      mode,
      deckColor,
      maxTownShops: playerCount <= 2 ? 12 : 14,
      town,
      shopDeck,
      artisanDeck,
      park,
      enchantmentDeck,
      enchantmentRow,
      fancyDeck,
      players,
      currentPlayerIndex: 0,
      phase: 'MOVE', // MOVE -> CHOOSE_ACTION -> GATHER_STEPS / ENCHANT_STEPS -> CLEANUP -> GAME_OVER
      gatherStep: { placed: false, fired: false, shopAbilityUsed: false },
      enchantStep: { firedIndices: [] },
      turnEnchanted: false,
      turnFilledShop: false,
      lastPlacedType: null,
      finalRoundTriggered: false,
      finalTurnPlayerIndex: null,
      extraTurnsRemaining: 0,
      log: ['Welcome to Town! Move your Flamekeeper to any Shop to begin your turn.']
    };

    this.render();
  }

  activePlayer() {
    return this.state.players[this.state.currentPlayerIndex];
  }

  addLog(msg) {
    this.state.log.unshift(msg);
    if (this.state.log.length > 60) this.state.log.pop();
  }

  checkFinalRoundTrigger(triggerReason) {
    if (!this.state.finalRoundTriggered && (this.state.artisanDeck.length === 0 || this.state.enchantmentDeck.length === 0)) {
      this.state.finalRoundTriggered = true;
      this.state.finalTurnPlayerIndex = this.state.currentPlayerIndex;
      this.addLog(`🔥 FINAL ROUND TRIGGERED (${triggerReason})! Every Flamekeeper finishes one final turn.`);
    }
  }

  // Grant rewards object { heart, coin, dragon, fancy }
  grantReward(player, reward) {
    if (!reward) return;
    if (reward.heart) {
      player.reputation += reward.heart;
    }
    if (reward.coin) {
      player.coins += reward.coin;
    }
    if (reward.dragon) {
      for (let i = 0; i < reward.dragon; i++) {
        this.drawArtisanFromDeckOrPark(player);
      }
    }
    if (reward.fancy) {
      for (let i = 0; i < reward.fancy; i++) {
        if (this.state.fancyDeck.length > 0) {
          player.fancy.push(this.state.fancyDeck.shift());
        }
      }
    }
  }

  drawArtisanFromDeckOrPark(player, parkIndex = null) {
    if (parkIndex !== null && this.state.park[parkIndex]) {
      const [card] = this.state.park.splice(parkIndex, 1);
      // Pizza Coven bonus goods on card
      if (card.goodsOnCard) {
        GOODS.forEach(g => {
          if (card.goodsOnCard[g]) player.goods[g] += card.goodsOnCard[g];
        });
        card.goodsOnCard = {};
      }
      player.hand.push(card);
      return card;
    }
    if (this.state.artisanDeck.length > 0) {
      const card = this.state.artisanDeck.shift();
      player.hand.push(card);
      this.checkFinalRoundTrigger('Last Artisan Dragon drawn');
      return card;
    } else if (this.state.park.length > 0) {
      const card = this.state.park.shift();
      player.hand.push(card);
      return card;
    }
    return null;
  }

  // Step 1: Move to a Shop
  moveToShop(shopIndex) {
    const p = this.activePlayer();
    const shop = this.state.town[shopIndex];
    if (!shop || shop.facedown) return;
    if (p.shopIndex === shopIndex) return;

    // Check other players present
    const othersHere = this.state.players.filter(other => other.id !== p.id && other.shopIndex === shopIndex);
    const totalGoodsAndCoins = GOODS.reduce((a, g) => a + p.goods[g], 0) + p.coins;

    if (!shop.noEntryGift && othersHere.length > 0) {
      if (totalGoodsAndCoins < othersHere.length) {
        alert(`You need at least ${othersHere.length} Good(s)/Coin(s) to gift players already at ${shop.name}!`);
        return;
      }
      othersHere.forEach(other => {
        const giftedGood = GOODS.find(g => p.goods[g] > 0);
        if (giftedGood) {
          p.goods[giftedGood]--;
          other.goods[giftedGood]++;
          this.addLog(`${p.name} gifted 1 ${GOOD_LABELS[giftedGood]} to ${other.name} to visit ${shop.name}.`);
        } else {
          p.coins--;
          other.coins++;
          this.addLog(`${p.name} gifted 1 Coin to ${other.name} to visit ${shop.name}.`);
        }
      });
    }

    p.shopIndex = shopIndex;
    this.state.phase = 'CHOOSE_ACTION';
    this.state.gatherStep = { placed: false, fired: false, shopAbilityUsed: false };
    this.state.enchantStep = { firedIndices: [] };
    this.state.turnEnchanted = false;
    this.state.turnFilledShop = false;
    this.state.lastPlacedType = null;
    this.addLog(`${p.name} moved to ${shop.name}.`);
    this.render();
  }

  // Option A: Start GATHER
  startGather() {
    const p = this.activePlayer();
    const shop = this.state.town[p.shopIndex];
    const gained = [];

    // 1. Shop base production
    if (GOODS.includes(shop.type)) {
      p.goods[shop.type]++;
      gained.push(GOOD_LABELS[shop.type]);
    } else if (shop.type === 'wild') {
      // Gain Good where player currently has the least
      const bestGood = [...GOODS].sort((a, b) => p.goods[a] - p.goods[b])[0];
      p.goods[bestGood]++;
      gained.push(`${GOOD_LABELS[bestGood]} (Wild)`);
    } else if (shop.type === 'coin') {
      p.coins += 1;
      gained.push('1 Coin');
    } else if (shop.type === 'coin3') {
      p.coins += 3;
      gained.push('3 Coins');
    } else if (shop.type === 'dragon') {
      const drawn = this.drawArtisanFromDeckOrPark(p);
      if (drawn) gained.push(`Dragon (${drawn.name})`);
    }

    // 2. Enchantments tucked under Shop
    shop.enchantments.forEach(enc => {
      if (GOODS.includes(enc.type)) {
        p.goods[enc.type]++;
        gained.push(GOOD_LABELS[enc.type]);
      }
    });

    // 3. Artisan Dragons at Shop (unless facedown at Draggin' Tail Roost)
    if (!shop.facedownSlots) {
      shop.dragons.forEach(d => {
        if (d && GOODS.includes(d.type)) {
          p.goods[d.type]++;
          gained.push(GOOD_LABELS[d.type]);
        }
      });
    }

    this.addLog(`${p.name} Gathered at ${shop.name}: +${gained.join(', ') || 'nothing'}.`);
    this.state.phase = 'GATHER_STEPS';
    this.render();
  }

  // Place an Artisan Dragon into a Shop Slot
  placeDragonInSlot(handIndex, targetShopIndex, slotIndex, options = { ignoreIcon: false, coinInsteadOfHeart: false, bonusCoins: 0, savingThrowBonus: false }) {
    const p = this.activePlayer();
    const dragon = p.hand[handIndex];
    const shop = this.state.town[targetShopIndex];
    if (!dragon || !shop || shop.dragons[slotIndex] !== null) return false;
    if (shop.id === 'shop_dragon_alley') return false;

    const slot = shop.slots[slotIndex];
    const matches = options.ignoreIcon || slot.types.includes('wild') || slot.types.includes(dragon.type);
    if (!matches) return false;

    // Remove from hand and place
    p.hand.splice(handIndex, 1);
    shop.dragons[slotIndex] = dragon;
    this.state.lastPlacedType = dragon.type;

    // Grant Slot Reward
    const reward = { ...slot.reward };
    if (options.coinInsteadOfHeart && reward.heart) {
      reward.coin = (reward.coin || 0) + reward.heart;
      delete reward.heart;
    }
    if (options.bonusCoins) {
      reward.coin = (reward.coin || 0) + options.bonusCoins;
    }
    this.grantReward(p, reward);
    this.addLog(`${p.name} placed ${dragon.name} (${GOOD_LABELS[dragon.type]}) at ${shop.name}.`);

    // Check if Shop just became full (all 3 slots occupied)
    if (shop.dragons.every(d => d !== null)) {
      this.state.turnFilledShop = true;
      if (options.savingThrowBonus) {
        p.reputation += 4;
        this.addLog(`${p.name} earned +4 Reputation from Saving Throw for filling ${shop.name}!`);
      }
      this.drawNewFacedownShop();
    }
    return true;
  }

  drawNewFacedownShop() {
    if (this.state.town.length >= this.state.maxTownShops || this.state.shopDeck.length === 0) return;
    const newShop = this.state.shopDeck.shift();
    this.state.town.push({
      ...newShop,
      slots: newShop.slots.map(s => ({ ...s })),
      dragons: [null, null, null],
      enchantments: [],
      facedown: true,
      alleyCoins: 0,
      lastFiredDragon: null
    });
    this.addLog(`A new Shop was placed facedown in Town (reveals at end of turn).`);
  }

  // Fire Up an Artisan Dragon
  fireUpDragon(type, shopIndex = this.activePlayer().shopIndex, slotIndex = null) {
    const p = this.activePlayer();
    const shop = this.state.town[shopIndex];
    if (shop) shop.lastFiredDragon = type;

    if (type === 'bread') {
      // Take 1st Park dragon or from deck
      const card = this.drawArtisanFromDeckOrPark(p, this.state.park.length > 0 ? 0 : null);
      this.addLog(`🍞 Fired Bread Dragon: ${p.name} drew ${card ? card.name : 'a dragon'}.`);
    } else if (type === 'iron') {
      // Gain 2 of 1 Good offered by this Shop or an Artisan Dragon here
      const availableGoods = new Set();
      if (shop && GOODS.includes(shop.type)) availableGoods.add(shop.type);
      if (shop && shop.type === 'wild') GOODS.forEach(g => availableGoods.add(g));
      if (shop && !shop.facedownSlots) {
        shop.dragons.forEach(d => { if (d && GOODS.includes(d.type)) availableGoods.add(d.type); });
      }
      if (availableGoods.size === 0) GOODS.forEach(g => availableGoods.add(g));
      const chosen = [...availableGoods].sort((a, b) => p.goods[a] - p.goods[b])[0];
      p.goods[chosen] += 2;
      this.addLog(`⚒️ Fired Iron Dragon: ${p.name} gained 2 ${GOOD_LABELS[chosen]}.`);
    } else if (type === 'crystal') {
      // Gain 3 different Goods (pick the 3 player has least of)
      const sorted = [...GOODS].sort((a, b) => p.goods[a] - p.goods[b]).slice(0, 3);
      sorted.forEach(g => p.goods[g]++);
      this.addLog(`💎 Fired Crystal Dragon: ${p.name} gained 1 ${sorted.map(g => GOOD_LABELS[g]).join(', 1 ')}.`);
    } else if (type === 'plant') {
      // Gift 1 Good or Coin to another player for +2 Rep
      const target = this.state.players.find(other => other.id !== p.id);
      const giftGood = [...GOODS].sort((a, b) => p.goods[b] - p.goods[a]).find(g => p.goods[g] > 0);
      if (target && (giftGood || p.coins > 0)) {
        if (giftGood) {
          p.goods[giftGood]--;
          target.goods[giftGood]++;
        } else {
          p.coins--;
          target.coins++;
        }
        p.reputation += 2;
        this.addLog(`🌿 Fired Plant Dragon: ${p.name} gifted 1 item to ${target.name} for +2 Reputation.`);
      }
    } else if (type === 'meat') {
      // Place 1 Artisan Dragon from hand into any matching empty slot in Town
      let placed = false;
      for (let h = 0; h < p.hand.length && !placed; h++) {
        for (let sIdx = 0; sIdx < this.state.town.length && !placed; sIdx++) {
          const tShop = this.state.town[sIdx];
          if (tShop.facedown) continue;
          for (let sl = 0; sl < 3 && !placed; sl++) {
            if (this.placeDragonInSlot(h, sIdx, sl)) {
              placed = true;
              this.addLog(`🥩 Fired Meat Dragon: ${p.name} placed a dragon in Town!`);
            }
          }
        }
      }
      if (!placed) this.addLog(`🥩 Fired Meat Dragon: No valid matching slot/dragon available.`);
    } else if (type === 'potion') {
      // Swap this Dragon with a Dragon in the Park (or another Shop)
      if (shop && slotIndex !== null && shop.dragons[slotIndex] && this.state.park.length > 0) {
        const currentDragon = shop.dragons[slotIndex];
        const parkDragon = this.state.park[0];
        shop.dragons[slotIndex] = parkDragon;
        this.state.park[0] = currentDragon;
        this.addLog(`🧪 Fired Potion Dragon: Swapped ${currentDragon.name} with ${parkDragon.name} from the Park.`);
      }
    }
  }

  // Check if player can afford an Enchantment
  canCastEnchantment(player, shop, enc) {
    if (!shop || shop.noEnchant || shop.enchantments.length >= 3) return false;
    if (shop.type !== 'wild' && shop.type !== enc.type) return false;

    if (enc.variablePair) {
      const [g1, g2] = enc.variablePair;
      const deficit1 = Math.max(0, 1 - player.goods[g1]);
      const deficit2 = Math.max(0, 1 - player.goods[g2]);
      return (deficit1 + deficit2) <= player.coins;
    }

    let missing = 0;
    Object.entries(enc.cost).forEach(([g, amt]) => {
      if (player.goods[g] < amt) missing += (amt - player.goods[g]);
    });
    if (enc.noCoin) return missing === 0;
    return missing <= player.coins;
  }

  // Cast an Enchantment onto active Shop
  castEnchantment(encIndex, fromReserve = false) {
    const p = this.activePlayer();
    const shop = this.state.town[p.shopIndex];
    const enc = fromReserve ? p.reservedEnchantment : this.state.enchantmentRow[encIndex];
    if (!enc || !this.canCastEnchantment(p, shop, enc)) return;

    if (enc.variablePair) {
      // Pay as many pairs as possible (up to 4) for maximum Reputation
      const [g1, g2] = enc.variablePair;
      let setsPaid = 0;
      while (setsPaid < enc.maxSets) {
        const need1 = p.goods[g1] > 0 ? 0 : 1;
        const need2 = p.goods[g2] > 0 ? 0 : 1;
        if (need1 + need2 <= p.coins) {
          if (p.goods[g1] > 0) p.goods[g1]--; else p.coins--;
          if (p.goods[g2] > 0) p.goods[g2]--; else p.coins--;
          setsPaid++;
        } else {
          break;
        }
      }
      const repEarned = enc.heartsPerSet[setsPaid - 1] || 0;
      p.reputation += repEarned;
      this.addLog(`✨ ${p.name} cast ${enc.name} (${setsPaid} pairs) on ${shop.name} for +${repEarned} Reputation!`);
    } else {
      Object.entries(enc.cost).forEach(([g, amt]) => {
        const useGood = Math.min(p.goods[g], amt);
        p.goods[g] -= useGood;
        const rem = amt - useGood;
        if (rem > 0) p.coins -= rem;
      });
      this.grantReward(p, enc.reward);
      this.addLog(`✨ ${p.name} cast ${enc.name} on ${shop.name}!`);
    }

    if (fromReserve) {
      p.reservedEnchantment = null;
    } else {
      this.state.enchantmentRow.splice(encIndex, 1);
    }

    shop.enchantments.push(enc);
    this.state.turnEnchanted = true;
    this.state.phase = 'ENCHANT_STEPS';
    this.render();
  }

  // Execute Shop Special Ability (Step 4 of Gather)
  useShopAbility() {
    const p = this.activePlayer();
    const shop = this.state.town[p.shopIndex];
    if (!shop || !shop.abilityId || this.state.gatherStep.shopAbilityUsed) return;

    const id = shop.abilityId;
    if (id === 'drake_of_cakes') {
      if (p.goods.bread + p.coins < 2) return alert('Need 2 Bread (or Coins)!');
      const useBread = Math.min(2, p.goods.bread);
      p.goods.bread -= useBread;
      p.coins -= (2 - useBread);
      for (let i = 0; i < 2 && this.state.park.length > 0; i++) {
        this.drawArtisanFromDeckOrPark(p, 0);
      }
      this.addLog(`${p.name} used Drake of Cakes to draw Park Dragons.`);
    } else if (id === 'la_petite_dragonne') {
      if (shop.dragons.every(Boolean)) {
        shop.dragons.forEach((d, idx) => {
          if (d) p.hand.push(d);
          shop.dragons[idx] = null;
        });
        this.addLog(`${p.name} took all 3 Artisan Dragons from La Petite Dragonne into hand!`);
      } else if (p.hand.length > 0) {
        const emptyIdx = shop.dragons.findIndex(d => d === null);
        this.placeDragonInSlot(0, p.shopIndex, emptyIdx, { coinInsteadOfHeart: true });
      }
    } else if (id === 'guilty_treasures') {
      const other = this.state.players.find(o => o.id !== p.id);
      if (p.goods.bread > 0) p.goods.bread--;
      else if (p.coins > 0) p.coins--;
      else return alert('Need 1 Bread or Coin!');
      if (other) other.goods.bread++;
      p.coins += 1;
      p.reputation += 2;
      this.addLog(`${p.name} used Guilty Treasures for +1 Coin and +2 Rep.`);
    } else if (id === 'gnome_depot') {
      const bestG = [...GOODS].sort((a, b) => p.goods[b] - p.goods[a])[0];
      if (p.goods[bestG] + p.coins < 8) return alert('Need 8 of one Good (including Coins)!');
      const useG = Math.min(8, p.goods[bestG]);
      p.goods[bestG] -= useG;
      p.coins -= (8 - useG);
      p.reputation += 8;
      this.addLog(`${p.name} paid 8 ${GOOD_LABELS[bestG]} at Gnome Depot for +8 Reputation!`);
    } else if (id === 'saving_throw') {
      let placed = false;
      for (let h = 0; h < p.hand.length && !placed; h++) {
        for (let sIdx = 0; sIdx < this.state.town.length && !placed; sIdx++) {
          for (let sl = 0; sl < 3 && !placed; sl++) {
            if (this.placeDragonInSlot(h, sIdx, sl, { savingThrowBonus: true })) placed = true;
          }
        }
      }
    } else if (id === 'the_savage_beast') {
      this.state.park.forEach(d => { if (GOODS.includes(d.type)) p.goods[d.type]++; });
      this.addLog(`${p.name} collected Goods matching all Park Dragons at The Savage Beast.`);
    } else if (id === 'draconic_tonic') {
      if (p.reservedEnchantment) return alert('You already have a reserved Enchantment!');
      if (this.state.enchantmentRow.length > 0) {
        p.reservedEnchantment = this.state.enchantmentRow.shift();
        this.addLog(`${p.name} reserved ${p.reservedEnchantment.name} at Draconic Tonic.`);
      }
    } else if (id === 'funky_brewsters') {
      const occIdx = shop.dragons.findIndex(Boolean);
      if (occIdx !== -1 && this.state.park.length > 0) {
        const oldD = shop.dragons[occIdx];
        const newD = this.state.park.shift();
        p.hand.push(oldD);
        shop.dragons[occIdx] = newD;
        this.fireUpDragon(newD.type, p.shopIndex, occIdx);
      }
    } else if (id === 'spellfire_springs') {
      if (p.goods.potion + p.coins < 2 || !shop.lastFiredDragon) return alert('Need 2 Potions and a fired dragon here!');
      const usePot = Math.min(2, p.goods.potion);
      p.goods.potion -= usePot;
      p.coins -= (2 - usePot);
      this.fireUpDragon(shop.lastFiredDragon, p.shopIndex);
      this.fireUpDragon(shop.lastFiredDragon, p.shopIndex);
    } else if (id === 'tip_the_scales') {
      if (p.goods.crystal + p.coins < 2) return alert('Need 2 Crystals!');
      const useCry = Math.min(2, p.goods.crystal);
      p.goods.crystal -= useCry;
      p.coins -= (2 - useCry);
      let converted = 0;
      GOODS.forEach(g => {
        if (converted < 3 && p.goods[g] > 0) {
          p.goods[g]--;
          p.coins++;
          p.reputation++;
          converted++;
        }
      });
      this.addLog(`${p.name} converted ${converted} Goods into Coins & Reputation at Tip the Scales.`);
    } else if (id === 'touch_o_glass') {
      if (p.hand.length === 0) return;
      const d = p.hand.shift();
      this.fireUpDragon(d.type, p.shopIndex);
      const other = this.state.players.find(o => o.id !== p.id);
      if (other) {
        other.hand.push(d);
        p.reputation
