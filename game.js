/* ============================================================================
   FLAMECRAFT — COMPLETE CARDS, SHOPS, ENCHANTMENTS & RULESET ENGINE
   All assets use inline W3C SVG symbols (zero AI-generated assets).
   ============================================================================ */

const GOODS = ['bread', 'meat', 'iron', 'crystal', 'plant', 'potion'];
const PLAYER_COLORS = ['#d99b26', '#a55eea', '#4b6584', '#45aaf2', '#c84b31'];

function iconHtml(type, label = '') {
  const map = {
    bread: 'icon-bread',
    meat: 'icon-meat',
    iron: 'icon-iron',
    crystal: 'icon-crystal',
    plant: 'icon-plant',
    potion: 'icon-potion',
    coin: 'icon-coin',
    heart: 'icon-heart',
    wild: 'icon-wild',
    dragon: 'icon-dragon',
    sun: 'icon-sun',
    moon: 'icon-moon'
  };
  const sym = map[type] || 'icon-wild';
  return `<svg class="svg-icon"><use href="#${sym}"></use></svg>${label ? ' ' + label : ''}`;
}

/* ----------------------------------------------------------------------------
   1. ARTISAN DRAGONS (6 Starter + 36 Regular = 42 Cards)
   ---------------------------------------------------------------------------- */
const ARTISAN_ABILITIES = {
  bread:   'Draw 1 Artisan Dragon from the Park or deck.',
  meat:    'Place 1 Artisan Dragon from your hand into any matching empty slot in Town (gain slot reward).',
  iron:    'Gain 2 of the same Good produced by this Shop or an Artisan Dragon here.',
  crystal: 'Gain any 3 different Goods.',
  plant:   'Gift 1 Good or Coin to another player to gain 2 Reputation.',
  potion:  'Swap this Dragon with any other Artisan Dragon in Town (ignoring slot icons) and Fire Up the swapped Dragon.'
};

const STARTER_DRAGONS = [
  { id: 'sd-pan',       name: 'Pan',       type: 'bread',   starter: true },
  { id: 'sd-hickory',   name: 'Hickory',   type: 'meat',    starter: true },
  { id: 'sd-wingnut',   name: 'Wingnut',   type: 'iron',    starter: true },
  { id: 'sd-brightgem', name: 'Brightgem', type: 'crystal', starter: true },
  { id: 'sd-twig',      name: 'Twig',      type: 'plant',   starter: true },
  { id: 'sd-tannin',    name: 'Tannin',    type: 'potion',  starter: true }
];

const REGULAR_DRAGONS_BY_TYPE = {
  bread:   ['Cinnabun', 'Cookie', 'Fondue', 'Honey', 'Loaf', 'Suzette'],
  potion:  ['Earl', 'Elderberry', 'Jasmine', 'Lavender', 'Thistle', 'Venti'],
  iron:    ['Cole', 'Flint', 'Patina', 'Roxanne', 'Rusty', 'Shale'],
  crystal: ['Deathfang', 'Frostfire', 'Jewelheart', 'Moonbeam', 'Opalwing', 'Silverscale'],
  meat:    ['Brisket', 'Cutlet', 'Flambé', 'Hot Dog', 'Potato', 'Skewart'],
  plant:   ['Blossom', 'Dandelion', 'Herb', 'Lotus', 'Mulch', 'Olive']
};

/* ----------------------------------------------------------------------------
   2. SHOPS (6 Starter Shops + 28 Town Shops = 34 Jumbo Shop Cards)
   ---------------------------------------------------------------------------- */
const STARTER_SHOPS = [
  {
    id: 'shop-starter-bread',
    name: 'First Knead Bakery',
    type: 'bread',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['bread'], reward: { heart: 0 } },
      { req: ['bread', 'plant'], reward: { heart: 2 } },
      { req: ['wild'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'shop-starter-meat',
    name: 'Sizzle & Scale Butcher',
    type: 'meat',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['meat'], reward: { heart: 0 } },
      { req: ['meat', 'iron'], reward: { dragon: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop-starter-iron',
    name: 'Spark & Anvil Smithy',
    type: 'iron',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['iron'], reward: { heart: 0 } },
      { req: ['iron', 'crystal'], reward: { heart: 2 } },
      { req: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop-starter-crystal',
    name: 'Prism Cavern Gems',
    type: 'crystal',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['crystal'], reward: { heart: 0 } },
      { req: ['crystal', 'potion'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop-starter-plant',
    name: 'Hello Nursery',
    type: 'plant',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['plant'], reward: { heart: 0 } },
      { req: ['plant', 'meat'], reward: { heart: 2 } },
      { req: ['wild'], reward: { dragon: 1 } }
    ]
  },
  {
    id: 'shop-starter-potion',
    name: 'Potable Potions',
    type: 'potion',
    starter: true,
    abilityText: 'Starter Shop (No special ability)',
    slots: [
      { req: ['potion'], reward: { heart: 0 } },
      { req: ['potion', 'bread'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  }
];

const TOWN_SHOPS_DATA = [
  // BREAD SHOPS (3)
  {
    id: 'drake-of-cakes', name: 'Drake of Cakes', type: 'bread',
    abilityId: 'drake_of_cakes',
    abilityText: 'Pay 2 Bread to draw 2 Artisan Dragons from the Park.',
    slots: [
      { req: ['bread'], reward: { heart: 2 } },
      { req: ['bread', 'potion'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'guilty-treasures', name: 'Guilty Treasures', type: 'bread',
    abilityId: 'guilty_treasures',
    abilityText: 'Pay 1 Coin for 4 Reputation, then you may gift 1 Coin to another player for 4 Reputation.',
    slots: [
      { req: ['bread', 'iron'], reward: { heart: 3 } },
      { req: ['crystal', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'la-petite-dragonne', name: 'La Petite Dragonne', type: 'bread',
    abilityId: 'la_petite_dragonne',
    abilityText: 'Place an Artisan Dragon here (gain Coins instead of Reputation) OR if full, return all 3 Dragons here to your hand.',
    slots: [
      { req: ['bread'], reward: { heart: 4 } },
      { req: ['potion', 'meat'], reward: { heart: 2, dragon: 1 } },
      { req: ['wild'], reward: { heart: 1, coin: 1 } }
    ]
  },
  // MEAT SHOPS (3)
  {
    id: 'pizza-coven', name: 'Pizza Coven', type: 'meat',
    abilityId: 'pizza_coven',
    abilityText: 'Place up to 5 Goods from your supply onto matching Park Dragons (1 Rep each; if all 5 matched, +1 Coin).',
    slots: [
      { req: ['plant', 'meat'], reward: { heart: 3 } },
      { req: ['bread', 'potion'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'full-plate-buffet', name: 'Full Plate Buffet', type: 'meat',
    abilityId: 'full_plate_buffet',
    abilityText: 'Gain 1 of each Good produced here; you may pay 1 Coin to repeat this once.',
    slots: [
      { req: ['bread', 'meat'], reward: { heart: 3 } },
      { req: ['potion', 'meat'], reward: { fancy: 1 } },
      { req: ['plant', 'meat'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'fogo-de-char', name: 'Fogo de Char', type: 'meat',
    abilityId: 'fogo_de_char',
    abilityText: 'Place 1 Artisan Dragon into any empty slot in Town ignoring slot icons; gain slot reward + 2 Coins.',
    slots: [
      { req: ['meat'], reward: { heart: 2 } },
      { req: ['iron', 'crystal'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  // IRON SHOPS (3)
  {
    id: 'gnome-depot', name: 'Gnome Depot', type: 'iron',
    abilityId: 'gnome_depot',
    abilityText: 'Pay 8 of one Good type (Coins may substitute) to gain 8 Reputation.',
    slots: [
      { req: ['iron'], reward: { heart: 2 } },
      { req: ['meat', 'iron'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'saving-throw', name: 'Saving Throw', type: 'iron',
    abilityId: 'saving_throw',
    abilityText: 'Place 1 Artisan Dragon in Town; if that placement fills the Shop, gain +4 Reputation.',
    slots: [
      { req: ['plant', 'meat'], reward: { heart: 3 } },
      { req: ['iron', 'crystal'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'the-savage-beast', name: 'The Savage Beast', type: 'iron',
    abilityId: 'the_savage_beast',
    abilityText: 'Gain 1 Good from each Artisan Dragon in the Park OR Fire Up all Dragons of 1 type in this Shop.',
    slots: [
      { req: ['iron', 'potion'], reward: { heart: 3 } },
      { req: ['bread', 'crystal'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { coin: 1 } }
    ]
  },
  // CRYSTAL SHOPS (3)
  {
    id: 'touch-o-glass', name: "Touch o' Glass", type: 'crystal',
    abilityId: 'touch_o_glass',
    abilityText: 'Fire Up 1 Artisan Dragon from your hand; you may then gift that Dragon to another player for 5 Reputation.',
    slots: [
      { req: ['bread', 'crystal'], reward: { heart: 3 } },
      { req: ['iron', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'dragon-hoard-bank', name: 'Dragon Hoard Bank', type: 'crystal',
    abilityId: 'dragon_hoard_bank',
    abilityText: 'Lose 3 Reputation to gain 3 Coins OR pay 2 Coins to gain 6 Reputation.',
    slots: [
      { req: ['iron', 'crystal'], reward: { heart: 3 } },
      { req: ['potion', 'plant'], reward: { coin: 1 } },
      { req: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'tip-the-scales', name: 'Tip the Scales', type: 'crystal',
    abilityId: 'tip_the_scales',
    abilityText: 'Pay 2 Crystals to trade up to 6 unique Goods (1 of each type) for 1 Reputation each.',
    slots: [
      { req: ['crystal'], reward: { heart: 2 } },
      { req: ['meat', 'crystal'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  // PLANT SHOPS (3)
  {
    id: 'sage-of-sage', name: 'Sage of Sage', type: 'plant',
    abilityId: 'sage_of_sage',
    abilityText: 'Gain 3 Goods shown in the cost of 1 Enchantment in the row (or reserved), and you may reserve it.',
    slots: [
      { req: ['bread', 'plant'], reward: { heart: 3 } },
      { req: ['crystal', 'potion'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'hedges-and-henges', name: 'Hedges & Henges', type: 'plant',
    abilityId: 'hedges_and_henges',
    abilityText: 'Gift up to 3 of one Good type to other players; gain 2 Reputation or 1 Coin per Good gifted.',
    slots: [
      { req: ['iron', 'potion'], reward: { heart: 3 } },
      { req: ['plant', 'bread'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'oh-my-gourd', name: 'Oh My Gourd!', type: 'plant',
    abilityId: 'oh_my_gourd',
    abilityText: 'Gain 2x the reward of an empty slot here OR gain 1 Good from each Artisan Dragon here (a second time).',
    slots: [
      { req: ['plant'], reward: { heart: 2 } },
      { req: ['meat', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  // POTION SHOPS (3)
  {
    id: 'draconic-tonic', name: 'Draconic Tonic', type: 'potion',
    abilityId: 'draconic_tonic',
    abilityText: 'Reserve 1 Enchantment from the row (if you have none reserved); you may immediately pay its cost to score it.',
    slots: [
      { req: ['potion', 'crystal'], reward: { heart: 3 } },
      { req: ['bread', 'meat'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'spellfire-springs', name: 'Spellfire Springs', type: 'potion',
    abilityId: 'spellfire_springs',
    abilityText: 'Pay 2 Potions to Fire Up the last Artisan Dragon you Fired here two more times.',
    slots: [
      { req: ['plant', 'crystal'], reward: { heart: 3 } },
      { req: ['potion', 'iron'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'funky-brewsters', name: 'Funky Brewsters', type: 'potion',
    abilityId: 'funky_brewsters',
    abilityText: 'Return 1 Artisan Dragon here to your hand, replace it with a Park Dragon (ignoring slot icon), and Fire it.',
    slots: [
      { req: ['potion'], reward: { heart: 2 } },
      { req: ['potion', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  // SPECIAL / WILD / COIN / DRAGON SHOPS (10)
  {
    id: 'bizarre-bazaar', name: 'Bizarre Bazaar', type: 'wild',
    abilityId: 'bizarre_bazaar',
    abilityText: 'Reveal and score 1 of your fulfilled Fancy Dragons (Sun or Moon), then draw 1 Fancy Dragon.',
    slots: [
      { req: ['bread', 'potion'], reward: { heart: 3 } },
      { req: ['iron', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'eternal-flame', name: 'Eternal Flame', type: 'wild',
    abilityId: 'eternal_flame',
    abilityText: 'On reveal, 2 deck Dragons fill slots 1 & 3. Ability: Gain 3 / 5 / 6 Reputation for 1 / 2 / 3 Enchantments here.',
    slots: [
      { req: ['wild'], reward: { heart: 0 } },
      { req: ['wild'], reward: { heart: 3 } },
      { req: ['wild'], reward: { heart: 0 } }
    ]
  },
  {
    id: 'flagons-and-dragons', name: 'Flagons & Dragons', type: 'wild',
    abilityId: 'flagons_and_dragons',
    abilityText: 'Gain 7 of one Good produced here; other players get 1 of that Good (no entry gift required here).',
    slots: [
      { req: ['potion', 'crystal'], reward: { heart: 3 } },
      { req: ['bread', 'meat'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'nunyas-beeswax', name: "Nunya's Beeswax", type: 'wild',
    abilityId: 'nunyas_beeswax',
    abilityText: 'Gain 1 Coin per Artisan Dragon here OR pay 1 Coin to Fire Up all Artisan Dragons here.',
    slots: [
      { req: ['meat', 'bread'], reward: { heart: 3 } },
      { req: ['plant', 'potion'], reward: { coin: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'scale-mail-post', name: 'Scale Mail Post', type: 'wild',
    abilityId: 'scale_mail_post',
    abilityText: 'Draw 2 Fancy Dragons, keep 1 and gift the other to another player to gain 4 Reputation.',
    slots: [
      { req: ['iron', 'crystal'], reward: { heart: 3 } },
      { req: ['bread', 'plant'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'maw-and-paws', name: "Maw & Paw's", type: 'coin',
    abilityId: 'maw_and_paws',
    abilityText: 'Flip 1 Coin: Heads = draw 1 Artisan Dragon, Tails = draw 1 Fancy Dragon. Pay 1 Coin to flip a second time.',
    slots: [
      { req: ['meat', 'crystal'], reward: { heart: 3 } },
      { req: ['plant', 'iron'], reward: { fancy: 1, heart: 2 } },
      { req: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'wishing-well', name: 'Wishing Well', type: 'coin',
    abilityId: 'wishing_well',
    abilityText: 'Produces 3 Coins when Gathering. Ability: Flip up to 3 Coins (Heads = +2 Reputation, Tails = lose Coin).',
    slots: [
      { req: ['bread', 'potion'], reward: { heart: 3 } },
      { req: ['meat', 'plant'], reward: { heart: 3 } },
      { req: ['wild'], reward: { heart: 3 } }
    ]
  },
  {
    id: 'dragon-alley', name: 'Dragon Alley', type: 'coin',
    abilityId: 'dragon_alley',
    abilityText: 'Leave 2 Coins here to gain +3 Reputation & +1 Fancy Dragon, OR take all Coins stored here.',
    slots: [
      { req: ['iron', 'potion'], reward: { coin: 2 } },
      { req: ['bread', 'crystal'], reward: { heart: 3 } },
      { req: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'sew-cute', name: 'Sew Cute', type: 'dragon',
    abilityId: 'sew_cute',
    abilityText: 'Produces 1 Artisan Dragon when Gathering. Ability: Gain 1 Reputation per Dragon in Town matching a type in your hand.',
    slots: [
      { req: ['wild'], reward: { heart: 2 } },
      { req: ['wild'], reward: { fancy: 1 } },
      { req: ['wild'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'draggin-tail-roost', name: "Draggin' Tail Roost", type: 'dragon',
    abilityId: 'draggin_tail_roost',
    abilityText: 'Produces 1 Artisan Dragon when Gathering. Ability: Choose a Park Dragon, Fire it Up, then draw it into hand.',
    slots: [
      { req: ['wild'], reward: { heart: 3 } },
      { req: ['wild'], reward: { heart: 3 } },
      { req: ['wild'], reward: { heart: 3 } }
    ]
  }
];

/* ----------------------------------------------------------------------------
   3. ENCHANTMENT CARDS (18 Purple Standard + 18 Golden Advanced = 36 Cards)
   ---------------------------------------------------------------------------- */
const PURPLE_ENCHANTMENTS = [
  // Bread (3)
  { id: 'ep-1', name: 'Crème Brûlée',    type: 'bread',   cost: { bread: 3, potion: 2 }, reward: { heart: 5, coin: 1 } },
  { id: 'ep-2', name: "Fairy's Jubilee", type: 'bread',   cost: { bread: 3, plant: 2 },  reward: { heart: 5, dragon: 1 } },
  { id: 'ep-3', name: "Imp'anadas",      type: 'bread',   cost: { bread: 3, meat: 3 },   reward: { heart: 6, fancy: 1 } },
  // Potion (3)
  { id: 'ep-4', name: 'Dwarven Stout',   type: 'potion',  cost: { potion: 3, iron: 2 },   reward: { heart: 5, coin: 1 } },
  { id: 'ep-5', name: 'Elfspresso',      type: 'potion',  cost: { potion: 3, plant: 2 },  reward: { heart: 5, dragon: 1 } },
  { id: 'ep-6', name: 'Hobbichino',      type: 'potion',  cost: { potion: 3, bread: 3 },  reward: { heart: 6, fancy: 1 } },
  // Iron (3)
  { id: 'ep-7', name: 'Vorpal Blade',    type: 'iron',    cost: { iron: 3, crystal: 2 },  reward: { heart: 5, coin: 1 } },
  { id: 'ep-8', name: 'Mithril Coat',    type: 'iron',    cost: { iron: 3, meat: 2 },     reward: { heart: 5, dragon: 1 } },
  { id: 'ep-9', name: 'Aegis Shield',    type: 'iron',    cost: { iron: 4, bread: 2 },    reward: { heart: 6, fancy: 1 } },
  // Crystal (3)
  { id: 'ep-10', name: 'Eye of Beholder', type: 'crystal', cost: { crystal: 3, potion: 2 }, reward: { heart: 5, coin: 1 } },
  { id: 'ep-11', name: 'Saber of Light',  type: 'crystal', cost: { crystal: 3, iron: 2 },   reward: { heart: 5, dragon: 1 } },
  { id: 'ep-12', name: 'Shard of Thra',   type: 'crystal', cost: { crystal: 4, plant: 2 },  reward: { heart: 6, fancy: 1 } },
  // Meat (3)
  { id: 'ep-13', name: 'Wyvern Wings',    type: 'meat',    cost: { meat: 3, bread: 2 },    reward: { heart: 5, coin: 1 } },
  { id: 'ep-14', name: 'Kraken Calamari', type: 'meat',    cost: { meat: 3, potion: 2 },   reward: { heart: 5, dragon: 1 } },
  { id: 'ep-15', name: 'Basilisk Burger', type: 'meat',    cost: { meat: 4, plant: 2 },    reward: { heart: 6, fancy: 1 } },
  // Plant (3)
  { id: 'ep-16', name: 'Mandrake Root',   type: 'plant',   cost: { plant: 3, crystal: 2 }, reward: { heart: 5, coin: 1 } },
  { id: 'ep-17', name: 'Pixie Moss',      type: 'plant',   cost: { plant: 3, meat: 2 },    reward: { heart: 5, dragon: 1 } },
  { id: 'ep-18', name: 'Whispering Lily', type: 'plant',   cost: { plant: 4, iron: 2 },    reward: { heart: 6, fancy: 1 } }
];

const GOLDEN_ENCHANTMENTS = [
  { id: 'eg-1',  name: 'Golden Croissant',   type: 'bread',   noCoins: true, cost: { bread: 4, crystal: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-2',  name: 'Sourdough Spell',    type: 'bread',   cost: { bread: 3, meat: 2, plant: 2 }, reward: { heart: 8 } },
  { id: 'eg-3',  name: 'Brioche Blessing',   type: 'bread',   cost: { bread: 5 }, reward: { heart: 6, dragon: 1 } },
  { id: 'eg-4',  name: 'Liquid Luck',        type: 'potion',  noCoins: true, cost: { potion: 4, bread: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-5',  name: 'Phoenix Elixir',     type: 'potion',  cost: { potion: 3, crystal: 2, iron: 2 }, reward: { heart: 8 } },
  { id: 'eg-6',  name: 'Moonlight Brew',     type: 'potion',  cost: { potion: 5 }, reward: { heart: 6, fancy: 1 } },
  { id: 'eg-7',  name: 'Dragonforged Helm',  type: 'iron',    noCoins: true, cost: { iron: 4, meat: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-8',  name: 'Runed Gauntlets',    type: 'iron',    cost: { iron: 3, bread: 2, potion: 2 }, reward: { heart: 8 } },
  { id: 'eg-9',  name: 'Starsteel Anvil',    type: 'iron',    cost: { iron: 5 }, reward: { heart: 6, dragon: 1 } },
  { id: 'eg-10', name: 'Astral Prism',       type: 'crystal', noCoins: true, cost: { crystal: 4, plant: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-11', name: 'Soul Gem',           type: 'crystal', cost: { crystal: 3, meat: 2, potion: 2 }, reward: { heart: 8 } },
  { id: 'eg-12', name: 'Diamond Lens',       type: 'crystal', cost: { crystal: 5 }, reward: { heart: 6, fancy: 1 } },
  { id: 'eg-13', name: 'Chimera Roast',      type: 'meat',    noCoins: true, cost: { meat: 4, iron: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-14', name: 'Phoenix Flambe',     type: 'meat',    cost: { meat: 3, bread: 2, crystal: 2 }, reward: { heart: 8 } },
  { id: 'eg-15', name: 'Dragon Ribeye',      type: 'meat',    cost: { meat: 5 }, reward: { heart: 6, dragon: 1 } },
  { id: 'eg-16', name: 'Worldtree Sapling',  type: 'plant',   noCoins: true, cost: { plant: 4, potion: 2 }, reward: { heart: 7, coin: 1 } },
  { id: 'eg-17', name: 'Sunbloom Bouquet',   type: 'plant',   cost: { plant: 3, iron: 2, bread: 2 }, reward: { heart: 8 } },
  { id: 'eg-18', name: 'Elder Vines',        type: 'plant',   cost: { plant: 5 }, reward: { heart: 6, fancy: 1 } }
];

/* ----------------------------------------------------------------------------
   4. FANCY DRAGONS (17 Sun Dragons + 19 Moon Dragons = 36 Cards)
   ---------------------------------------------------------------------------- */
const FANCY_DRAGONS_DATA = [
  // 17 SUN DRAGONS (Scored during your turn when fulfilled)
  { id: 'fd-buttercup', name: 'Buttercup', phase: 'sun', desc: 'Have at least 1 of each of the 6 Goods: Gain 4 Reputation.', check: (p, g) => GOODS.every(k => p.goods[k] >= 1), score: () => 4 },
  { id: 'fd-chonkers',  name: 'Chonkers',  phase: 'sun', desc: 'Pay 4 Bread & 4 Meat: Gain 9 Reputation.', check: (p) => p.goods.bread >= 4 && p.goods.meat >= 4, cost: { bread: 4, meat: 4 }, score: () => 9 },
  { id: 'fd-dazzle',    name: 'Dazzle',    phase: 'sun', desc: 'Pay 4 Crystal & 4 Potion: Gain 9 Reputation.', check: (p) => p.goods.crystal >= 4 && p.goods.potion >= 4, cost: { crystal: 4, potion: 4 }, score: () => 9 },
  { id: 'fd-frazzle',   name: 'Frazzle',   phase: 'sun', desc: 'Have 3+ Enchantments cast across Town: Gain 4 Reputation.', check: (p, g) => g.town.reduce((s, sh) => s + sh.enchantments.length, 0) >= 3, score: () => 4 },
  { id: 'fd-goldrush',  name: 'Goldrush',  phase: 'sun', desc: 'Have 4+ Coins in your supply: Gain 4 Reputation.', check: (p) => p.coins >= 4, score: () => 4 },
  { id: 'fd-greenhorn', name: 'Greenhorn', phase: 'sun', desc: 'Pay 4 Plant & 4 Iron: Gain 9 Reputation.', check: (p) => p.goods.plant >= 4 && p.goods.iron >= 4, cost: { plant: 4, iron: 4 }, score: () => 9 },
  { id: 'fd-hocus',     name: 'Hocus',     phase: 'sun', desc: 'Visit a Shop with 2+ Enchantments: Gain 5 Reputation.', check: (p, g) => p.shopIndex !== null && g.town[p.shopIndex].enchantments.length >= 2, score: () => 5 },
  { id: 'fd-nightbrite',name: 'Nightbrite',phase: 'sun', desc: 'Have 5+ Artisan Dragons in your hand: Gain 4 Reputation.', check: (p) => p.hand.length >= 5, score: () => 4 },
  { id: 'fd-pinkytoe',  name: 'Pinkytoe',  phase: 'sun', desc: 'Pay 3 Coins: Gain 6 Reputation.', check: (p) => p.coins >= 3, costCoins: 3, score: () => 6 },
  { id: 'fd-pocus',     name: 'Pocus',     phase: 'sun', desc: 'Visit a full Shop (3 Dragons present): Gain 4 Reputation.', check: (p, g) => p.shopIndex !== null && g.town[p.shopIndex].slots.every(sl => sl.dragon), score: () => 4 },
  { id: 'fd-rainbow',   name: 'Rainbow',   phase: 'sun', desc: 'Pay 1 of each of the 6 Goods: Gain 8 Reputation.', check: (p) => GOODS.every(k => p.goods[k] >= 1), cost: { bread: 1, meat: 1, iron: 1, crystal: 1, plant: 1, potion: 1 }, score: () => 8 },
  { id: 'fd-sparkle',   name: 'Sparkle',   phase: 'sun', desc: 'Have enchanted at least 1 Shop this game: Gain 4 Reputation.', check: (p) => p.enchantCount >= 1, score: () => 4 },
  { id: 'fd-starburst', name: 'Starburst', phase: 'sun', desc: 'Have 15+ Goods total across your supply: Gain 5 Reputation.', check: (p) => GOODS.reduce((a, k) => a + p.goods[k], 0) >= 15, score: () => 5 },
  { id: 'fd-sunlight',  name: 'Sunlight',  phase: 'sun', desc: 'Have 7 of any single Good type: Gain 4 Reputation.', check: (p) => GOODS.some(k => p.goods[k] >= 7), score: () => 4 },
  { id: 'fd-taylor',    name: 'Taylor',    phase: 'sun', desc: 'Visit a Shop with 3 Dragons of different types: Gain 5 Reputation.', check: (p, g) => {
    if (p.shopIndex === null) return false;
    const types = g.town[p.shopIndex].slots.map(s => s.dragon && s.dragon.type).filter(Boolean);
    return new Set(types).size === 3;
  }, score: () => 5 },
  { id: 'fd-twinkle',   name: 'Twinkle',   phase: 'sun', desc: 'Have 2+ Enchantments cast by you: Gain 5 Reputation.', check: (p) => p.enchantCount >= 2, score: () => 5 },
  { id: 'fd-westley',   name: 'Westley',   phase: 'sun', desc: 'Have 3+ Fancy Dragons (including Westley): Gain 4 Reputation.', check: (p) => p.fancy.length >= 3, score: () => 4 },

  // 19 MOON DRAGONS (Scored at End of Game)
  { id: 'fd-sweetie',  name: 'Sweetie',  phase: 'moon', desc: 'End of Game: 1 Rep per Bread Dragon in Town (+3 Rep if Bread is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'bread') },
  { id: 'fd-umami',    name: 'Umami',    phase: 'moon', desc: 'End of Game: 1 Rep per Meat Dragon in Town (+3 Rep if Meat is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'meat') },
  { id: 'fd-savannah', name: 'Savannah', phase: 'moon', desc: 'End of Game: 1 Rep per Plant Dragon in Town (+3 Rep if Plant is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'plant') },
  { id: 'fd-jitters',  name: 'Jitters',  phase: 'moon', desc: 'End of Game: 1 Rep per Potion Dragon in Town (+3 Rep if Potion is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'potion') },
  { id: 'fd-shadow',   name: 'Shadow',   phase: 'moon', desc: 'End of Game: 1 Rep per Iron Dragon in Town (+3 Rep if Iron is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'iron') },
  { id: 'fd-gemma',    name: 'Gemma',    phase: 'moon', desc: 'End of Game: 1 Rep per Crystal Dragon in Town (+3 Rep if Crystal is most common).', score: (p, g) => scoreDragonTypeMoon(g, 'crystal') },
  { id: 'fd-toasty',   name: 'Toasty',   phase: 'moon', desc: 'End of Game: 1 Rep per Bread you have (+3 Rep if you have the most Bread, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'bread') },
  { id: 'fd-carnie',   name: 'Carnie',   phase: 'moon', desc: 'End of Game: 1 Rep per Meat you have (+3 Rep if you have the most Meat, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'meat') },
  { id: 'fd-forrest',  name: 'Forrest',  phase: 'moon', desc: 'End of Game: 1 Rep per Plant you have (+3 Rep if you have the most Plant, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'plant') },
  { id: 'fd-elix',     name: 'Elix',     phase: 'moon', desc: 'End of Game: 1 Rep per Potion you have (+3 Rep if you have the most Potion, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'potion') },
  { id: 'fd-ajax',     name: 'Ajax',     phase: 'moon', desc: 'End of Game: 1 Rep per Iron you have (+3 Rep if you have the most Iron, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'iron') },
  { id: 'fd-zircon',   name: 'Zircon',   phase: 'moon', desc: 'End of Game: 1 Rep per Crystal you have (+3 Rep if you have the most Crystal, min 3).', score: (p, g) => scoreGoodMostMoon(p, g, 'crystal') },
  { id: 'fd-bubu',     name: 'Bubu',     phase: 'moon', desc: 'End of Game: 2 Rep for each Shop with 3 Dragons in Town (max 10).', score: (p, g) => Math.min(10, g.town.filter(sh => sh.slots.every(s => s.dragon)).length * 2) },
  { id: 'fd-buddy',    name: 'Buddy',    phase: 'moon', desc: 'End of Game: 2 Rep per Artisan Dragon in your hand.', score: (p) => p.hand.length * 2 },
  { id: 'fd-matches',  name: 'Matches',  phase: 'moon', desc: 'End of Game: 2 Rep for each Enchanted Shop in Town (max 10).', score: (p, g) => Math.min(10, g.town.filter(sh => sh.enchantments.length > 0).length * 2) },
  { id: 'fd-shimmer',  name: 'Shimmer',  phase: 'moon', desc: 'End of Game: 3 Rep for each complete set of all 6 Goods you hold.', score: (p) => Math.min(...GOODS.map(k => p.goods[k])) * 3 },
  { id: 'fd-steven',   name: 'Steven',   phase: 'moon', desc: 'End of Game: 1 Rep for each Good type of which you have an even quantity (0 counts as even).', score: (p) => GOODS.filter(k => p.goods[k] % 2 === 0).length },
  { id: 'fd-talisman', name: 'Talisman', phase: 'moon', desc: 'End of Game: 2 Rep per Sun Fancy Dragon you have scored.', score: (p) => p.fancy.filter(f => f.scored && f.phase === 'sun').length * 2 },
  { id: 'fd-todd',     name: 'Todd',     phase: 'moon', desc: 'End of Game: 1 Rep for each non-Starter Shop open in Town.', score: (p, g) => g.town.filter(sh => !sh.starter).length }
];

function scoreDragonTypeMoon(game, type) {
  const counts = { bread: 0, meat: 0, iron: 0, crystal: 0, plant: 0, potion: 0 };
  game.town.forEach(sh => sh.slots.forEach(sl => {
    if (sl.dragon && counts[sl.dragon.type] !== undefined) counts[sl.dragon.type]++;
  }));
  const max = Math.max(...Object.values(counts));
  const base = counts[type];
  return base + (base === max && max > 0 ? 3 : 0);
}

function scoreGoodMostMoon(player, game, good) {
  const myCount = player.goods[good];
  const max = Math.max(...game.players.map(pl => pl.goods[good]));
  return myCount + (myCount === max && myCount >= 3 ? 3 : 0);
}

/* ============================================================================
   GAME STATE & SETUP ENGINE
   ============================================================================ */
let G = null;

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initNewGame() {
  const playerCount = parseInt(document.getElementById('player-count-select').value, 10);
  const enchantDeckChoice = document.getElementById('enchant-deck-select').value;

  // Build Artisan Deck per Official Player Count Rules:
  // 2 players: 4 of each type (remove 2 sets); 3 players: 5 of each type; 4-5 players: all 6 of each type
  const perTypeCount = playerCount === 2 ? 4 : (playerCount === 3 ? 5 : 6);
  let artisanDeck = [];
  GOODS.forEach(type => {
    const names = shuffle(REGULAR_DRAGONS_BY_TYPE[type]).slice(0, perTypeCount);
    names.forEach((name, idx) => {
      artisanDeck.push({ id: `ad-${type}-${idx}`, name, type, storedGoods: {} });
    });
  });
  artisanDeck = shuffle(artisanDeck);

  // Build Shop Deck per Official Rulebook (1 Shop of each of the 6 Goods + 4 Special Shops = 10 Shops)
  let shopDeck = [];
  GOODS.forEach(type => {
    const matching = shuffle(TOWN_SHOPS_DATA.filter(s => s.type === type));
    if (matching[0]) shopDeck.push(structuredClone(matching[0]));
  });
  const specials = shuffle(TOWN_SHOPS_DATA.filter(s => !GOODS.includes(s.type))).slice(0, 4);
  specials.forEach(s => shopDeck.push(structuredClone(s)));
  shopDeck = shuffle(shopDeck);

  // Setup 6 Starter Shops with matching Starter Artisan Dragons in Slot 0
  const town = STARTER_SHOPS.map((sh, idx) => {
    const clone = structuredClone(sh);
    clone.enchantments = [];
    clone.storedCoins = 0;
    clone.slots = clone.slots.map((sl, sIdx) => ({
      ...sl,
      dragon: sIdx === 0 ? structuredClone(STARTER_DRAGONS[idx]) : null
    }));
    return clone;
  });

  // Setup Enchantment Deck
  const rawEnchant = enchantDeckChoice === 'gold' ? GOLDEN_ENCHANTMENTS : PURPLE_ENCHANTMENTS;
  const enchantDeck = shuffle(structuredClone(rawEnchant));

  // Setup Fancy Deck
  const fancyDeck = shuffle(structuredClone(FANCY_DRAGONS_DATA));

  // Deal Park (5 face-up Artisan Dragons) & Enchantment Row (5 face-up Enchantments)
  const park = artisanDeck.splice(0, 5);
  const enchantRow = enchantDeck.splice(0, 5);

  // Setup Players (3 Artisan Dragons, draw 2 Fancy & keep 1; 4th/5th players get +1 starting Good)
  const players = [];
  for (let i = 0; i < playerCount; i++) {
    const hand = artisanDeck.splice(0, 3);
    const fancyChoices = fancyDeck.splice(0, 2);
    const keptFancy = fancyChoices[0];
    fancyDeck.push(fancyChoices[1]); // Return unchosen Fancy Dragon to bottom of Fancy deck

    const goods = { bread: 0, meat: 0, iron: 0, crystal: 0, plant: 0, potion: 0 };
    if (i >= 3) goods.bread = 1; // 4th and 5th player bonus Good

    players.push({
      id: i,
      name: `Flamekeeper ${i + 1}`,
      color: PLAYER_COLORS[i],
      reputation: 0,
      coins: 0,
      goods,
      hand,
      fancy: [{ ...keptFancy, scored: false }],
      reservedEnchant: null,
      shopIndex: null,
      enchantCount: 0
    });
  }

  G = {
    players,
    activePlayerIndex: 0,
    town,
    shopDeck,
    pendingNewShops: 0,
    artisanDeck,
    park,
    enchantDeck,
    enchantRow,
    fancyDeck,
    turnPhase: 'VISIT_SHOP', // VISIT_SHOP | CHOOSE_MODE | GATHER_STEPS | ENCHANT_STEPS | GAME_OVER
    gatherStep: { placed: false, fired: false, shopAbilityUsed: false, lastFiredDragon: null },
    enchantFiredIndices: [],
    finalRoundTriggered: false,
    finalRoundTurnsLeft: null,
    log: ['Welcome to Flamecraft! All 6 Starter Shops and Starter Artisan Dragons are ready in Town.']
  };

  renderAll();
}

function logMsg(msg) {
  G.log.unshift(msg);
  renderAll();
}

function activePlayer() {
  return G.players[G.activePlayerIndex];
}

/* ============================================================================
   TURN FLOW: VISIT A SHOP -> GATHER OR ENCHANT -> CLEANUP
   ============================================================================ */
function handleVisitShop(shopIdx) {
  if (G.turnPhase !== 'VISIT_SHOP') return;
  const p = activePlayer();
  if (p.shopIndex === shopIdx) {
    alert('You must choose a different Shop than the one you visited on your last turn!');
    return;
  }

  const targetShop = G.town[shopIdx];
  const occupants = G.players.filter(other => other.id !== p.id && other.shopIndex === shopIdx);

  // Flagons & Dragons overrides the entry gift requirement
  const requiresGift = targetShop.id !== 'flagons-and-dragons' && occupants.length > 0;
  const totalResources = GOODS.reduce((s, k) => s + p.goods[k], 0) + p.coins;

  if (requiresGift && totalResources < occupants.length) {
    alert(`You need at least ${occupants.length} Good(s)/Coin(s) to gift the Flamekeepers already at ${targetShop.name}!`);
    return;
  }

  if (requiresGift) {
    occupants.forEach(occ => {
      autoPayOneGoodOrCoin(p, occ);
      logMsg(`${p.name} gifted 1 item to ${occ.name} to visit ${targetShop.name}.`);
    });
  }

  p.shopIndex = shopIdx;
  G.turnPhase = 'CHOOSE_MODE';
  logMsg(`${p.name} moved to ${targetShop.name}.`);
  renderAll();
}

function autoPayOneGoodOrCoin(fromPlayer, toPlayer) {
  for (const g of GOODS) {
    if (fromPlayer.goods[g] > 0) {
      fromPlayer.goods[g]--;
      toPlayer.goods[g]++;
      return;
    }
  }
  if (fromPlayer.coins > 0) {
    fromPlayer.coins--;
    toPlayer.coins++;
  }
}

/* ----------------------------------------------------------------------------
   OPTION A: GATHER AT SHOP
   1. Gather Goods -> 2. Place Dragon (opt) -> 3. Fire 1 Dragon (opt) -> 4. Shop Ability (opt)
   ---------------------------------------------------------------------------- */
function startGather() {
  const p = activePlayer();
  const shop = G.town[p.shopIndex];

  // Step 1: Gather Goods from Shop, Enchantments, and Artisan Dragons
  let gainedSummary = [];
  if (GOODS.includes(shop.type)) {
    p.goods[shop.type]++;
    gainedSummary.push(`1 ${shop.type}`);
  } else if (shop.type === 'wild') {
    p.goods.bread++;
    gainedSummary.push('1 wild (bread)');
  } else if (shop.type === 'coin') {
    const c = shop.id === 'wishing-well' ? 3 : 1;
    p.coins += c;
    gainedSummary.push(`${c} Coin(s)`);
  } else if (shop.type === 'dragon') {
    drawArtisanFromDeckOrPark(p);
    gainedSummary.push('1 Artisan Dragon');
  }

  shop.enchantments.forEach(en => {
    if (GOODS.includes(en.type)) {
      p.goods[en.type]++;
      gainedSummary.push(`1 ${en.type} (Enchantment)`);
    }
  });

  shop.slots.forEach(sl => {
    if (sl.dragon && !sl.faceDown && GOODS.includes(sl.dragon.type)) {
      p.goods[sl.dragon.type]++;
      gainedSummary.push(`1 ${sl.dragon.type} (${sl.dragon.name})`);
    }
  });

  logMsg(`${p.name} Gathered at ${shop.name}: ${gainedSummary.join(', ')}.`);
  G.turnPhase = 'GATHER_STEPS';
  G.gatherStep = { placed: false, fired: false, shopAbilityUsed: false, lastFiredDragon: null };
  renderAll();
}

function drawArtisanFromDeckOrPark(player, fromParkIdx = null) {
  if (fromParkIdx !== null && G.park[fromParkIdx]) {
    const [card] = G.park.splice(fromParkIdx, 1);
    if (card.storedGoods) {
      GOODS.forEach(k => { player.goods[k] += (card.storedGoods[k] || 0); });
      card.storedGoods = {};
    }
    player.hand.push(card);
    return card;
  }
  if (G.artisanDeck.length > 0) {
    const card = G.artisanDeck.shift();
    player.hand.push(card);
    if (G.artisanDeck.length === 0) triggerFinalRound('Artisan Dragon deck');
    return card;
  }
  return null;
}

function drawFancyDragon(player) {
  if (G.fancyDeck.length > 0) {
    const card = G.fancyDeck.shift();
    player.fancy.push({ ...card, scored: false });
    return card;
  }
  return null;
}

function grantReward(player, reward, coinsInsteadOfHeart = false) {
  if (!reward) return;
  if (reward.heart) {
    if (coinsInsteadOfHeart) player.coins += reward.heart;
    else player.reputation += reward.heart;
  }
  if (reward.coin) player.coins += reward.coin;
  if (reward.dragon) {
    for (let i = 0; i < reward.dragon; i++) drawArtisanFromDeckOrPark(player);
  }
  if (reward.fancy) {
    for (let i = 0; i < reward.fancy; i++) drawFancyDragon(player);
  }
}

function openPlaceDragonModal(targetShopIndex = null, ignoreIcons = false, extraCoins = 0, fillBonusRep = 0, coinsInsteadOfHeart = false) {
  const p = activePlayer();
  if (p.hand.length === 0) {
    alert('You have no Artisan Dragons in your hand!');
    return;
  }

  const shopsToInspect = targetShopIndex !== null ? [{ shop: G.town[targetShopIndex], sIdx: targetShopIndex }]
    : G.town.map((shop, sIdx) => ({ shop, sIdx }));

  let optionsHtml = '';
  p.hand.forEach((dragon, hIdx) => {
    shopsToInspect.forEach(({ shop, sIdx }) => {
      shop.slots.forEach((slot, slotIdx) => {
        const matches = ignoreIcons || slot.req.includes('wild') || slot.req.includes(dragon.type);
        if (!slot.dragon && matches) {
          optionsHtml += `
            <div class="mini-card">
              <div class="card-main">
                <div class="card-name">${iconHtml(dragon.type)} ${dragon.name} → ${shop.name} (Slot ${slotIdx + 1})</div>
                <div class="card-desc">Slot Reward: ${formatReward(slot.reward)}</div>
              </div>
              <button class="btn-action" onclick="confirmPlaceDragon(${hIdx}, ${sIdx}, ${slotIdx}, ${extraCoins}, ${fillBonusRep}, ${coinsInsteadOfHeart})">Place</button>
            </div>`;
        }
      });
    });
  });

  if (!optionsHtml) {
    alert('No matching empty Dragon slots available for the Dragons in your hand!');
    return;
  }

  showModal('Place an Artisan Dragon', optionsHtml);
}

function confirmPlaceDragon(handIdx, shopIdx, slotIdx, extraCoins = 0, fillBonusRep = 0, coinsInsteadOfHeart = false) {
  const p = activePlayer();
  const [dragon] = p.hand.splice(handIdx, 1);
  const shop = G.town[shopIdx];
  const slot = shop.slots[slotIdx];

  slot.dragon = dragon;
  if (shop.id === 'draggin-tail-roost') slot.faceDown = true;

  grantReward(p, slot.reward, coinsInsteadOfHeart);
  if (extraCoins > 0) p.coins += extraCoins;

  if (G.turnPhase === 'GATHER_STEPS' && shopIdx === p.shopIndex) {
    G.gatherStep.placed = true;
  }

  // Check if Shop was just filled
  const isNowFull = shop.slots.every(s => s.dragon !== null);
  if (isNowFull) {
    if (fillBonusRep > 0) p.reputation += fillBonusRep;
    if (G.shopDeck.length > 0 && G.town.length + G.pendingNewShops < 14) {
      G.pendingNewShops++;
      logMsg(`${shop.name} is now full! A new Shop will open at the end of the turn.`);
    }
  }

  logMsg(`${p.name} placed ${dragon.name} (${dragon.type}) at ${shop.name}.`);
  closeModal();
  renderAll();
}

/* ----------------------------------------------------------------------------
   FIRE UP ARTISAN DRAGON ABILITIES (ALL 6 TYPES)
   ---------------------------------------------------------------------------- */
function openFireDragonModal() {
  const p = activePlayer();
  const shop = G.town[p.shopIndex];
  const validSlots = shop.slots
    .map((sl, idx) => ({ sl, idx }))
    .filter(({ sl }) => sl.dragon && !sl.faceDown);

  if (validSlots.length === 0) {
    alert('No face-up Artisan Dragons at this Shop to Fire Up!');
    return;
  }

  const html = validSlots.map(({ sl, idx }) => `
    <div class="mini-card">
      <div class="card-main">
        <div class="card-name">${iconHtml(sl.dragon.type)} ${sl.dragon.name} (${sl.dragon.type.toUpperCase()})</div>
        <div class="card-desc">${ARTISAN_ABILITIES[sl.dragon.type]}</div>
      </div>
      <button class="btn-action" onclick="executeFireDragon(${p.shopIndex}, ${idx}, true)">Fire Up</button>
    </div>
  `).join('');

  showModal('Fire Up an Artisan Dragon', html);
}

function executeFireDragon(shopIdx, slotIdx, markGatherFired = false, customDragon = null) {
  closeModal();
  const p = activePlayer();
  const shop = G.town[shopIdx];
  const dragon = customDragon || (shop && shop.slots[slotIdx] ? shop.slots[slotIdx].dragon : null);
  if (!dragon) return;

  if (markGatherFired) {
    G.gatherStep.fired = true;
    G.gatherStep.lastFiredDragon = dragon;
  }

  const type = dragon.type;
  if (type === 'bread') {
    // Choose from Park or top of Deck
    let html = `<div class="mini-card"><div class="card-main"><strong>Draw from Top of Artisan Deck</strong></div>
      <button class="btn-action" onclick="resolveBreadDragon(null)">Draw Deck</button></div>`;
    G.park.forEach((pk, idx) => {
      html += `<div class="mini-card"><div class="card-main">${iconHtml(pk.type)} <strong>${pk.name}</strong> (${pk.type})</div>
        <button class="btn-action" onclick="resolveBreadDragon(${idx})">Take from Park</button></div>`;
    });
    showModal(`🔥 Fire Up ${dragon.name} (Bread Dragon)`, html);
  } else if (type === 'meat') {
    openPlaceDragonModal(null, false, 0, 0, false);
  } else if (type === 'iron') {
    const availTypes = new Set();
    if (shop && GOODS.includes(shop.type)) availTypes.add(shop.type);
    if (shop && shop.type === 'wild') GOODS.forEach(g => availTypes.add(g));
    if (shop) {
      shop.slots.forEach(s => {
        if (s.dragon && GOODS.includes(s.dragon.type)) availTypes.add(s.dragon.type);
      });
    } else {
      availTypes.add(dragon.type);
    }
    const html = [...availTypes].map(g => `
      <button class="btn-action" onclick="resolveIronDragon('${g}')">${iconHtml(g, '+2 ' + g.toUpperCase())}</button>
    `).join('');
    showModal(`🔥 Fire Up ${dragon.name} (Iron Dragon): Gain 2 Matching Goods`, html);
  } else if (type === 'crystal') {
    // Gain 3 different Goods (auto-pick 3 lowest to streamline or let player choose)
    const sorted = [...GOODS].sort((a, b) => p.goods[a] - p.goods[b]).slice(0, 3);
    sorted.forEach(g => p.goods[g]++);
    logMsg(`${p.name} Fired Up ${dragon.name} (Crystal): Gained 1 ${sorted[0]}, 1 ${sorted[1]}, and 1 ${sorted[2]}.`);
    renderAll();
  } else if (type === 'plant') {
    const others = G.players.filter(o => o.id !== p.id);
    let html = '';
    others.forEach(o => {
      GOODS.forEach(g => {
        if (p.goods[g] > 0) {
          html += `<button class="btn-action" onclick="resolvePlantDragon(${o.id}, '${g}')">Gift 1 ${g} to ${o.name} (+2 Rep)</button>`;
        }
      });
      if (p.coins > 0) {
        html += `<button class="btn-action" onclick="resolvePlantDragon(${o.id}, 'coin')">Gift 1 Coin to ${o.name} (+2 Rep)</button>`;
      }
    });
    if (!html) {
      alert('You have no Goods or Coins to gift!');
      return;
    }
    showModal(`🔥 Fire Up ${dragon.name} (Plant Dragon)`, html);
  } else if (type === 'potion') {
    let html = '';
    G.town.forEach((otherShop, oSIdx) => {
      otherShop.slots.forEach((oSlot, oSlotIdx) => {
        if (oSlot.dragon && !oSlot.faceDown && !(oSIdx === shopIdx && oSlotIdx === slotIdx)) {
          html += `<div class="mini-card">
            <div class="card-main">${iconHtml(oSlot.dragon.type)} <strong>${oSlot.dragon.name}</strong> at ${otherShop.name}</div>
            <button class="btn-action" onclick="resolvePotionDragon(${shopIdx}, ${slotIdx}, ${oSIdx}, ${oSlotIdx})">Swap & Fire</button>
          </div>`;
        }
      });
    });
    if (!html) {
      alert('No other face-up Artisan Dragons in Town to swap with!');
      return;
    }
    showModal(`🔥 Fire Up ${dragon.name} (Potion Dragon)`, html);
  }
}

function resolveBreadDragon(parkIdx) {
  const p = activePlayer();
  const card = drawArtisanFromDeckOrPark(p, parkIdx);
  closeModal();
  if (card) logMsg(`${p.name} drew ${card.name} (${card.type}) via Bread Dragon ability.`);
  renderAll();
}

function resolveIronDragon(goodType) {
  const p = activePlayer();
  p.goods[goodType] += 2;
  closeModal();
  logMsg(`${p.name} gained 2 ${goodType} via Iron Dragon ability.`);
  renderAll();
}

function resolvePlantDragon(targetPlayerId, itemType) {
  const p = activePlayer();
  const target = G.players.find(x => x.id === targetPlayerId);
  if (itemType === 'coin') {
    p.coins--;
    target.coins++;
  } else {
    p.goods[itemType]--;
    target.goods[itemType]++;
  }
  p.reputation += 2;
  closeModal();
  logMsg(`${p.name} gifted 1 ${itemType} to ${target.name} for +2 Reputation.`);
  renderAll();
}

function resolvePotionDragon(shopA, slotA, shopB, slotB) {
  closeModal();
  const dragA = G.town[shopA].slots[slotA].dragon;
  const dragB = G.town[shopB].slots[slotB].dragon;
  G.town[shopA].slots[slotA].dragon = dragB;
  G.town[shopB].slots[slotB].dragon = dragA;
  logMsg(`${activePlayer().name} swapped ${dragA.name} with ${dragB.name} and Fired Up ${dragB.name}!`);
  executeFireDragon(shopA, slotA, false);
}

/* ----------------------------------------------------------------------------
   UNIQUE SHOP ABILITIES (ALL 28 NON-STARTER SHOPS)
   ---------------------------------------------------------------------------- */
function useShopAbility() {
  const p = activePlayer();
  const shop = G.town[p.shopIndex];
  if (!shop || shop.starter || G.gatherStep.shopAbilityUsed) return;

  const id = shop.abilityId;
  if (id === 'drake_of_cakes') {
    if (p.goods.bread + p.coins < 2) return alert('Need 2 Bread (or Coins)!');
    paySpecificGoodOrCoins(p, 'bread', 2);
    drawArtisanFromDeckOrPark(p, 0);
    drawArtisanFromDeckOrPark(p, 0);
    markShopAbility(`${p.name} used Drake of Cakes to draw 2 Park Dragons.`);
  } else if (id === 'guilty_treasures') {
    if (p.coins < 1) return alert('Need at least 1 Coin!');
    p.coins--;
    p.reputation += 4;
    if (p.coins >= 1 && G.players.length > 1) {
      const other = G.players.find(o => o.id !== p.id);
      p.coins--;
      other.coins++;
      p.reputation += 4;
      markShopAbility(`${p.name} used Guilty Treasures for +8 Reputation total.`);
    } else {
      markShopAbility(`${p.name} used Guilty Treasures for +4 Reputation.`);
    }
  } else if (id === 'la_petite_dragonne') {
    const isFull = shop.slots.every(s => s.dragon !== null);
    if (isFull) {
      shop.slots.forEach(s => { p.hand.push(s.dragon); s.dragon = null; });
      markShopAbility(`${p.name} took all 3 Artisan Dragons from La Petite Dragonne into hand!`);
    } else {
      G.gatherStep.shopAbilityUsed = true;
      openPlaceDragonModal(p.shopIndex, false, 0, 0, true);
    }
  } else if (id === 'pizza_coven') {
    let matched = 0;
    G.park.forEach(pk => {
      if (p.goods[pk.type] > 0) {
        p.goods[pk.type]--;
        pk.storedGoods = pk.storedGoods || {};
        pk.storedGoods[pk.type] = (pk.storedGoods[pk.type] || 0) + 1;
        p.reputation += 1;
        matched++;
      }
    });
    if (matched === 5) p.coins += 1;
    markShopAbility(`${p.name} placed ${matched} Goods on Park Dragons at Pizza Coven (+${matched} Rep).`);
  } else if (id === 'full_plate_buffet') {
    const types = new Set();
    if (GOODS.includes(shop.type)) types.add(shop.type);
    shop.slots.forEach(s => { if (s.dragon && GOODS.includes(s.dragon.type)) types.add(s.dragon.type); });
    shop.enchantments.forEach(e => { if (GOODS.includes(e.type)) types.add(e.type); });
    types.forEach(t => p.goods[t]++);
    if (p.coins > 0 && confirm('Pay 1 Coin to collect a second set of Goods at Full Plate Buffet?')) {
      p.coins--;
      types.forEach(t => p.goods[t]++);
    }
    markShopAbility(`${p.name} feasted at Full Plate Buffet!`);
  } else if (id === 'fogo_de_char') {
    G.gatherStep.shopAbilityUsed = true;
    openPlaceDragonModal(null, true, 2, 0, false);
  } else if (id === 'gnome_depot') {
    const bestGood = GOODS.find(g => p.goods[g] + p.coins >= 8);
    if (!bestGood) return alert('You need 8 of one Good type (Coins may substitute)!');
    paySpecificGoodOrCoins(p, bestGood, 8);
    p.reputation += 8;
    markShopAbility(`${p.name} paid 8 ${bestGood} at Gnome Depot for +8 Reputation!`);
  } else if (id === 'saving_throw') {
    G.gatherStep.shopAbilityUsed = true;
    openPlaceDragonModal(null, false, 0, 4, false);
  } else if (id === 'the_savage_beast') {
    G.park.forEach(pk => { if (GOODS.includes(pk.type)) p.goods[pk.type]++; });
    markShopAbility(`${p.name} collected 1 Good from each Park Dragon at The Savage Beast!`);
  } else if (id === 'touch_o_glass') {
    if (p.hand.length === 0) return alert('No Artisan Dragon in hand!');
    const d = p.hand.pop();
    const other = G.players.find(o => o.id !== p.id);
    other.hand.push(d);
    p.reputation += 5;
    markShopAbility(`${p.name} Fired & gifted ${d.name} at Touch o' Glass for +5 Reputation!`);
    executeFireDragon(p.shopIndex, 0, false, d);
  } else if (id === 'dragon_hoard_bank') {
    if (p.coins >= 2) {
      p.coins -= 2;
      p.reputation += 6;
      markShopAbility(`${p.name} paid 2 Coins for +6 Reputation at Dragon Hoard Bank.`);
    } else if (p.reputation >= 3) {
      p.reputation -= 3;
      p.coins += 3;
      markShopAbility(`${p.name} traded 3 Reputation for 3 Coins at Dragon Hoard Bank.`);
    } else {
      alert('Need either 2 Coins or 3 Reputation!');
    }
  } else if (id === 'tip_the_scales') {
    if (p.goods.crystal + p.coins < 2) return alert('Need 2 Crystal to use Tip the Scales!');
    paySpecificGoodOrCoins(p, 'crystal', 2);
    let traded = 0;
    GOODS.forEach(g => {
      if (p.goods[g] > 0) { p.goods[g]--; traded++; }
    });
    p.reputation += traded;
    markShopAbility(`${p.name} traded ${traded} unique Goods for +${traded} Reputation at Tip the Scales.`);
  } else if (id === 'sage_of_sage') {
    const targetEn = G.enchantRow[0];
    if (!targetEn) return;
    const costKeys = Object.keys(targetEn.cost);
    for (let i = 0; i < 3; i++) {
      const k = costKeys[i % costKeys.length];
      p.goods[k]++;
    }
    if (!p.reservedEnchant) {
      p.reservedEnchant = G.enchantRow.shift();
    }
    markShopAbility(`${p.name} gained 3 Goods & reserved ${targetEn.name} at Sage of Sage.`);
  } else if (id === 'hedges_and_henges') {
    const gType = GOODS.find(g => p.goods[g] > 0);
    if (!gType) return alert('No Goods to gift!');
    const count = Math.min(3, p.goods[gType]);
    p.goods[gType] -= count;
    const other = G.players.find(o => o.id !== p.id);
    other.goods[gType] += count;
    p.reputation += count * 2;
    markShopAbility(`${p.name} gifted ${count} ${gType} at Hedges & Henges for +${count * 2} Reputation.`);
  } else if (id === 'oh_my_gourd') {
    let gained = 0;
    shop.slots.forEach(s => {
      if (s.dragon && GOODS.includes(s.dragon.type)) {
        p.goods[s.dragon.type]++;
        gained++;
      }
    });
    markShopAbility(`${p.name} collected ${gained} bonus Dragon Goods at Oh My Gourd!`);
  } else if (id === 'draconic_tonic') {
    if (p.reservedEnchant) return alert('You already have a reserved Enchantment!');
    if (G.enchantRow.length === 0) return;
    p.reservedEnchant = G.enchantRow.shift();
    markShopAbility(`${p.name} reserved ${p.reservedEnchant.name} at Draconic Tonic.`);
  } else if (id === 'spellfire_springs') {
    if (!G.gatherStep.lastFiredDragon) return alert('You have not Fired a Dragon here this turn!');
    if (p.goods.potion + p.coins < 2) return alert('Need 2 Potions!');
    paySpecificGoodOrCoins(p, 'potion', 2);
    markShopAbility(`${p.name} used Spellfire Springs to Fire ${G.gatherStep.lastFiredDragon.name} twice more!`);
    executeFireDragon(p.shopIndex, 0, false, G.gatherStep.lastFiredDragon);
  } else if (id === 'funky_brewsters') {
    const filledIdx = shop.slots.findIndex(s => s.dragon !== null);
    if (filledIdx === -1 || G.park.length === 0) return alert('Need a Dragon here and a Dragon in the Park!');
    const oldDragon = shop.slots[filledIdx].dragon;
    const newDragon = G.park.shift();
    shop.slots[filledIdx].dragon = newDragon;
    p.hand.push(oldDragon);
    markShopAbility(`${p.name} swapped ${oldDragon.name} into hand for ${newDragon.name} at Funky Brewsters!`);
    executeFireDragon(p.shopIndex, filledIdx, false, newDragon);
  } else if (id === 'bizarre_bazaar') {
    const eligible = p.fancy.find(f => !f.scored && (f.phase === 'moon' || f.check(p, G)));
    if (!eligible) return alert('No fulfilled Fancy Dragon to score!');
    scoreFancyCard(p, eligible);
    drawFancyDragon(p);
    markShopAbility(`${p.name} scored ${eligible.name} and drew a new Fancy Dragon at Bizarre Bazaar!`);
  } else if (id === 'eternal_flame') {
    const count = shop.enchantments.length;
    const rep = count === 1 ? 3 : (count === 2 ? 5 : (count >= 3 ? 6 : 0));
    p.reputation += rep;
    markShopAbility(`${p.name} gained +${rep} Reputation from Eternal Flame.`);
  } else if (id === 'flagons_and_dragons') {
    const gType = shop.slots.find(s => s.dragon)?.dragon.type || 'bread';
    p.goods[gType] += 7;
    G.players.filter(o => o.id !== p.id).forEach(o => o.goods[gType]++);
    markShopAbility(`${p.name} gained 7 ${gType} at Flagons & Dragons (everyone else gained 1)!`);
  } else if (id === 'nunyas_beeswax') {
    const count = shop.slots.filter(s => s.dragon).length;
    p.coins += count;
    markShopAbility(`${p.name} gained ${count} Coin(s) at Nunya's Beeswax.`);
  } else if (id === 'scale_mail_post') {
    const f1 = drawFancyDragon(p);
    const other = G.players.find(o => o.id !== p.id);
    const f2 = drawFancyDragon(other);
    p.reputation += 4;
    markShopAbility(`${p.name} drew ${f1 ? f1.name : 'a Fancy Dragon'} and gifted 1 to ${other.name} (+4 Rep).`);
  } else if (id === 'maw_and_paws') {
    const heads = Math.random() < 0.5;
    if (heads) drawArtisanFromDeckOrPark(p);
    else drawFancyDragon(p);
    markShopAbility(`${p.name} flipped ${heads ? 'HEADS (Artisan Dragon)' : 'TAILS (Fancy Dragon)'} at Maw & Paw's.`);
  } else if (id === 'wishing_well') {
    const flips = Math.min(3, p.coins);
    let headsCount = 0;
    for (let i = 0; i < flips; i++) {
      if (Math.random() < 0.5) { p.reputation += 2; headsCount++; }
      else p.coins--;
    }
    markShopAbility(`${p.name} flipped ${flips} Coin(s) at Wishing Well: ${headsCount} Heads (+${headsCount * 2} Rep)!`);
  } else if (id === 'dragon_alley') {
    if (shop.storedCoins > 0) {
      p.coins += shop.storedCoins;
      const taken = shop.storedCoins;
      shop.storedCoins = 0;
      markShopAbility(`${p.name} collected ${taken} Coins from Dragon Alley!`);
    } else if (p.coins >= 2) {
      p.coins -= 2;
      shop.storedCoins += 2;
      p.reputation += 3;
      drawFancyDragon(p);
      markShopAbility(`${p.name} left 2 Coins at Dragon Alley for +3 Reputation & 1 Fancy Dragon!`);
    } else {
      alert('Need 2 Coins to leave at Dragon Alley (or Coins stored there to take)!');
    }
  } else if (id === 'sew_cute') {
    const targetType = p.hand[0]?.type || 'bread';
    let count = 0;
    G.town.forEach(sh => sh.slots.forEach(s => { if (s.dragon && s.dragon.type === targetType) count++; }));
    p.reputation += count;
    markShopAbility(`${p.name} scored +${count} Reputation for ${targetType} Dragons in Town at Sew Cute.`);
  } else if (id === 'draggin_tail_roost') {
    if (G.park.length === 0) return;
    const card = drawArtisanFromDeckOrPark(p, 0);
    markShopAbility(`${p.name} Fired Up & recruited ${card.name} from the Park at Draggin' Tail Roost!`);
    executeFireDragon(p.shopIndex, 0, false, card);
  }
}

function markShopAbility(msg) {
  G.gatherStep.shopAbilityUsed = true;
  logMsg(msg);
  renderAll();
}

function paySpecificGoodOrCoins(player, good, amount) {
  const fromGood = Math.min(player.goods[good], amount);
  player.goods[good] -= fromGood;
  player.coins -= (amount - fromGood);
}

/* ----------------------------------------------------------------------------
   OPTION B: ENCHANT A SHOP
   1. Cast matching Enchantment (max 3 per Shop) -> 2. Fire Up ALL Dragons in Shop
   ---------------------------------------------------------------------------- */
function openEnchantModal() {
  const p = activePlayer();
  const shop = G.town[p.shopIndex];

  if (shop.enchantments.length >= 3) {
    alert('This Shop already has the maximum of 3 Enchantments!');
    return;
  }

  const candidates = [
    ...G.enchantRow.map((e, idx) => ({ e, source: 'row', idx })),
    ...(p.reservedEnchant ? [{ e: p.reservedEnchant, source: 'reserved', idx: 0 }] : [])
  ].filter(({ e }) => shop.type === 'wild' || e.type === shop.type);

  if (candidates.length === 0) {
    alert('No Enchantment in the row (or reserved) matches this Shop type!');
    return;
  }

  const html = candidates.map(({ e, source, idx }) => {
    const canPay = canAffordEnchantment(p, e);
    return `
      <div class="mini-card">
        <div class="card-main">
          <div class="card-name">${iconHtml(e.type)} ${e.name} ${source === 'reserved' ? '(Reserved)' : ''}</div>
          <div class="card-desc">Cost: ${formatCost(e.cost, e.noCoins)} | Reward: ${formatReward(e.reward)}</div>
        </div>
        <button class="btn-action" ${canPay ? '' : 'disabled style="opacity:0.4"'} onclick="castEnchantment('${source}', ${idx})">Cast</button>
      </div>`;
  }).join('');

  showModal(`✨ Enchant ${shop.name}`, html);
}

function canAffordEnchantment(player, enchant) {
  let missing = 0;
  Object.entries(enchant.cost).forEach(([g, amt]) => {
    if (player.goods[g] < amt) missing += (amt - player.goods[g]);
  });
  if (enchant.noCoins) return missing === 0;
  return player.coins >= missing;
}

function castEnchantment(source, idx) {
  const p = activePlayer();
  const shop = G.town[p.shopIndex];
  const enchant = source === 'reserved' ? p.reservedEnchant : G.enchantRow[idx];

  Object.entries(enchant.cost).forEach(([g, amt]) => {
    const used = Math.min(p.goods[g], amt);
    p.goods[g] -= used;
    p.coins -= (amt - used);
  });

  if (source === 'reserved') p.reservedEnchant = null;
  else G.enchantRow.splice(idx, 1);

  shop.enchantments.push(enchant);
  p.enchantCount++;
  grantReward(p, enchant.reward);

  closeModal();
  logMsg(`${p.name} enchanted ${shop.name} with ${enchant.name}! Now they may Fire Up ALL Dragons at ${shop.name}.`);
  G.turnPhase = 'ENCHANT_STEPS';
  G.enchantFiredIndices = [];
  renderAll();
}

function fireEnchantDragon(slotIdx) {
  const p = activePlayer();
  if (G.enchantFiredIndices.includes(slotIdx)) return;
  G.enchantFiredIndices.push(slotIdx);
  executeFireDragon(p.shopIndex, slotIdx, false);
  renderAll();
}

/* ----------------------------------------------------------------------------
   SCORING SUN & MOON FANCY DRAGONS
   ---------------------------------------------------------------------------- */
function scoreSunDragon(fancyIdx) {
  const p = activePlayer();
  const f = p.fancy[fancyIdx];
  if (!f || f.scored || f.phase !== 'sun') return;
  if (!f.check(p, G)) {
    alert(`Goal not yet fulfilled for ${f.name}!`);
    return;
  }
  scoreFancyCard(p, f);
  renderAll();
}

function scoreFancyCard(player, fancyCard) {
  if (fancyCard.cost) {
    Object.entries(fancyCard.cost).forEach(([g, amt]) => { player.goods[g] -= amt; });
  }
  if (fancyCard.costCoins) player.coins -= fancyCard.costCoins;
  const pts = fancyCard.score(player, G);
  player.reputation += pts;
  fancyCard.scored = true;
  logMsg(`🌞 ${player.name} fulfilled & scored Fancy Dragon ${fancyCard.name} for +${pts} Reputation!`);
}

/* ----------------------------------------------------------------------------
   END OF TURN CLEANUP:
   1. Expand Town -> 2. Enforce Hand (6) & Goods (7) Limits -> 3. Refresh Park & Enchantments
   ---------------------------------------------------------------------------- */
function endTurn() {
  const p = activePlayer();

  // 1. Expand Town (flip any newly drawn Shops face-up)
  while (G.pendingNewShops > 0 && G.shopDeck.length > 0 && G.town.length < 14) {
    const newShop = G.shopDeck.shift();
    newShop.enchantments = [];
    newShop.storedCoins = 0;
    newShop.slots = newShop.slots.map(sl => ({ ...sl, dragon: null }));
    if (newShop.id === 'eternal-flame') {
      if (G.artisanDeck.length > 0) newShop.slots[0].dragon = G.artisanDeck.shift();
      if (G.artisanDeck.length > 0) newShop.slots[2].dragon = G.artisanDeck.shift();
    }
    G.town.push(newShop);
    G.pendingNewShops--;
    logMsg(`🏗️ Town Expanded! New Shop revealed: ${newShop.name}.`);
  }

  // 2. Enforce Artisan Dragon Hand Limit (Max 6 returned to bottom of deck) & Goods Limit (Max 7 per type)
  while (p.hand.length > 6) {
    const returned = p.hand.pop();
    G.artisanDeck.push(returned);
    logMsg(`${p.name} returned excess Artisan Dragon (${returned.name}) to the bottom of the deck.`);
  }
  GOODS.forEach(g => {
    if (p.goods[g] > 7) {
      p.goods[g] = 7;
    }
  });

  // 3. Refresh Park (up to 5) & Enchantment Row (up to 5)
  while (G.park.length < 5 && G.artisanDeck.length > 0) {
    G.park.push(G.artisanDeck.shift());
    if (G.artisanDeck.length === 0) triggerFinalRound('Artisan Dragon deck');
  }
  while (G.enchantRow.length < 5 && G.enchantDeck.length > 0) {
    G.enchantRow.push(G.enchantDeck.shift());
    if (G.enchantDeck.length === 0) triggerFinalRound('Enchantment deck');
  }

  // Check End of Game
  if (G.finalRoundTriggered) {
    G.finalRoundTurnsLeft--;
    if (G.finalRoundTurnsLeft <= 0) {
      finishGameScoring();
      return;
    }
  }

  G.activePlayerIndex = (G.activePlayerIndex + 1) % G.players.length;
  G.turnPhase = 'VISIT_SHOP';
  renderAll();
}

function triggerFinalRound(reason) {
  if (G.finalRoundTriggered) return;
  G.finalRoundTriggered = true;
  G.finalRoundTurnsLeft = G.players.length;
  logMsg(`🔔 The last card of the ${reason} was revealed! Every player gets 1 final turn.`);
}

function finishGameScoring() {
  G.turnPhase = 'GAME_OVER';
  // Official Order: 1. Coins -> 1 Rep each (spent before Moon Dragons) 2. Score Moon Fancy Dragons
  G.players.forEach(p => {
    if (p.coins > 0) {
      p.reputation += p.coins;
      logMsg(`${p.name} redeemed ${p.coins} leftover Coin(s) for +${p.coins} Reputation.`);
      p.coins = 0;
    }
    p.fancy.forEach(f => {
      if (!f.scored && f.phase === 'moon') {
        const pts = f.score(p, G);
        p.reputation += pts;
        f.scored = true;
        logMsg(`🌙 ${p.name} scored Moon Dragon ${f.name} for +${pts} Reputation.`);
      }
    });
  });

  const sorted = [...G.players].sort((a, b) => b.reputation - a.reputation);
  logMsg(`🏆 Game Over! ${sorted[0].name} wins the title of Master of Flamecraft with ${sorted[0].reputation} Reputation!`);
  renderAll();
}

/* ============================================================================
   UI RENDERING & MODALS
   ============================================================================ */
function formatReward(r) {
  if (!r) return 'None';
  const parts = [];
  if (r.heart) parts.push(`${r.heart} ❤️`);
  if (r.coin) parts.push(`${r.coin} 🪙`);
  if (r.dragon) parts.push(`${r.dragon} 🐉 Artisan`);
  if (r.fancy) parts.push(`${r.fancy} 🌟 Fancy`);
  return parts.join(', ') || 'Starter Slot';
}

function formatCost(cost, noCoins) {
  const parts = Object.entries(cost).map(([g, amt]) => `${amt} ${iconHtml(g, g)}`);
  if (noCoins) parts.push('(No Coins)');
  return parts.join(' ');
}

function renderAll() {
  if (!G) return;
  const p = activePlayer();

  // Turn Banner
  const statusEl = document.getElementById('turn-status');
  const actionsEl = document.getElementById('turn-actions');
  actionsEl.innerHTML = '';

  if (G.turnPhase === 'VISIT_SHOP') {
    statusEl.innerHTML = `<span style="color:${p.color}">●</span> <strong>${p.name}'s Turn:</strong> Choose a Town Shop to visit.`;
  } else if (G.turnPhase === 'CHOOSE_MODE') {
    const shop = G.town[p.shopIndex];
    statusEl.innerHTML = `<strong>${p.name}</strong> is at <strong>${shop.name}</strong>. Choose to Gather or Enchant:`;
    actionsEl.innerHTML = `
      <button class="btn-action" onclick="startGather()">🧺 Gather Goods</button>
      <button class="btn-action" onclick="openEnchantModal()">✨ Enchant Shop</button>
    `;
  } else if (G.turnPhase === 'GATHER_STEPS') {
    const shop = G.town[p.shopIndex];
    statusEl.innerHTML = `<strong>${p.name}</strong> Gathering at <strong>${shop.name}</strong> — Optional Steps:`;
    actionsEl.innerHTML = `
      <button class="btn-action" ${G.gatherStep.placed ? 'disabled style="opacity:0.4"' : ''} onclick="openPlaceDragonModal(${p.shopIndex})">1. Place Dragon</button>
      <button class="btn-action" ${G.gatherStep.fired ? 'disabled style="opacity:0.4"' : ''} onclick="openFireDragonModal()">2. Fire Up 1 Dragon</button>
      <button class="btn-action" ${(shop.starter || G.gatherStep.shopAbilityUsed) ? 'disabled style="opacity:0.4"' : ''} onclick="useShopAbility()">3. Use Shop Ability</button>
      <button class="btn-primary" onclick="endTurn()">End Turn →</button>
    `;
  } else if (G.turnPhase === 'ENCHANT_STEPS') {
    const shop = G.town[p.shopIndex];
    statusEl.innerHTML = `<strong>${p.name}</strong> Enchanted <strong>${shop.name}</strong> — Fire Up any/all Dragons here:`;
    shop.slots.forEach((sl, idx) => {
      if (sl.dragon && !sl.faceDown && !G.enchantFiredIndices.includes(idx)) {
        actionsEl.innerHTML += `<button class="btn-action" onclick="fireEnchantDragon(${idx})">🔥 Fire ${sl.dragon.name}</button>`;
      }
    });
    actionsEl.innerHTML += `<button class="btn-primary" onclick="endTurn()">End Turn →</button>`;
  } else if (G.turnPhase === 'GAME_OVER') {
    statusEl.innerHTML = `🏆 <strong>Game Complete!</strong> Final Reputation scores calculated.`;
  }

  // Park & Enchantment Row
  document.getElementById('artisan-deck-count').textContent = `Deck: ${G.artisanDeck.length}`;
  document.getElementById('enchant-deck-count').textContent = `Deck: ${G.enchantDeck.length}`;
  document.getElementById('fancy-deck-count').textContent = G.fancyDeck.length;
  document.getElementById('shop-deck-count').textContent = G.shopDeck.length;

  document.getElementById('park-row').innerHTML = G.park.map(d => `
    <div class="mini-card">
      <div class="card-main">
        <div class="card-name">${iconHtml(d.type)} ${d.name} <span style="font-weight:400;color:#666">(${d.type})</span></div>
        <div class="card-desc">${ARTISAN_ABILITIES[d.type]}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('enchant-row').innerHTML = G.enchantRow.map(e => `
    <div class="mini-card">
      <div class="card-main">
        <div class="card-name">${iconHtml(e.type)} ${e.name}</div>
        <div class="card-desc">Cost: ${formatCost(e.cost, e.noCoins)}</div>
        <div class="card-desc">Reward: <strong>${formatReward(e.reward)}</strong></div>
      </div>
    </div>
  `).join('');

  // Town Grid
  document.getElementById('town-grid').innerHTML = G.town.map((sh, sIdx) => {
    const isActive = p.shopIndex === sIdx;
    const canVisit = G.turnPhase === 'VISIT_SHOP' && p.shopIndex !== sIdx;
    const occupants = G.players.filter(pl => pl.shopIndex === sIdx);

    return `
      <div class="shop-card ${canVisit ? 'visitable' : ''} ${isActive ? 'active-shop' : ''}"
           onclick="${canVisit ? `handleVisitShop(${sIdx})` : ''}">
        <div>
          <div class="shop-header">
            <span class="shop-title">${iconHtml(sh.type)} ${sh.name}</span>
            <span class="deck-badge">${sh.type.toUpperCase()}</span>
          </div>
          <div class="shop-ability">${sh.abilityText} ${sh.storedCoins ? `(🪙 ${sh.storedCoins} on card)` : ''}</div>
          <div class="shop-enchantments">
            ${sh.enchantments.map(en => `<span class="enchant-pill">✨ ${en.name} (+1 ${en.type})</span>`).join('')}
          </div>
          <div class="dragon-slots">
            ${sh.slots.map((sl, slotIdx) => {
              if (sl.dragon) {
                return `
                  <div class="dragon-slot filled">
                    <div>${iconHtml(sl.dragon.type)} <strong>${sl.faceDown ? 'Facedown' : sl.dragon.name}</strong></div>
                    <div style="font-size:0.68rem;color:#555">${sl.dragon.type}</div>
                  </div>`;
              }
              return `
                <div class="dragon-slot">
                  <div>Slot ${slotIdx + 1}: ${sl.req.map(r => iconHtml(r)).join('/')}</div>
                  <div style="font-size:0.68rem;color:#666">${formatReward(sl.reward)}</div>
                </div>`;
            }).join('')}
          </div>
        </div>
        <div class="shop-meeples">
          ${occupants.map(occ => `<span class="player-meeple" style="background:${occ.color}">🐉 ${occ.name}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Players Overview
  document.getElementById('players-overview').innerHTML = G.players.map(pl => `
    <div class="player-row ${pl.id === p.id ? 'current-turn' : ''}">
      <div class="player-row-header">
        <span style="color:${pl.color}">● ${pl.name}</span>
        <span>❤️ ${pl.reputation} Rep | 🪙 ${pl.coins}</span>
      </div>
      <div style="font-size:0.74rem;color:#555">
        Hand: ${pl.hand.length}🐉 | Fancy: ${pl.fancy.length}🌟 |
        ${GOODS.map(g => `${iconHtml(g)}${pl.goods[g]}`).join(' ')}
      </div>
    </div>
  `).join('');

  // Active Player Panel
  document.getElementById('active-player-title').innerHTML = `<span style="color:${p.color}">●</span> ${p.name}'s Supply`;
  document.getElementById('active-player-goods').innerHTML = [
    ...GOODS.map(g => `<div class="good-chip"><span>${iconHtml(g)} ${g}</span><span>${p.goods[g]}/7</span></div>`),
    `<div class="good-chip"><span>${iconHtml('coin')} coins</span><span>${p.coins}</span></div>`,
    `<div class="good-chip"><span>${iconHtml('heart')} rep</span><span>${p.reputation}</span></div>`
  ].join('');

  document.getElementById('hand-count').textContent = p.hand.length;
  document.getElementById('active-player-hand').innerHTML = p.hand.map(d => `
    <div class="mini-card">
      <div class="card-main">
        <div class="card-name">${iconHtml(d.type)} ${d.name} (${d.type})</div>
        <div class="card-desc">${ARTISAN_ABILITIES[d.type]}</div>
      </div>
    </div>
  `).join('') || '<div class="hint">No Artisan Dragons in hand.</div>';

  document.getElementById('active-player-fancy').innerHTML = p.fancy.map((f, idx) => {
    const canScoreSun = !f.scored && f.phase === 'sun' && f.check(p, G);
    return `
      <div class="mini-card">
        <div class="card-main">
          <div class="card-name">${iconHtml(f.phase)} ${f.name} (${f.phase.toUpperCase()}) ${f.scored ? '✅ Scored' : ''}</div>
          <div class="card-desc">${f.desc}</div>
        </div>
        ${canScoreSun ? `<button class="btn-action" onclick="scoreSunDragon(${idx})">Score Now</button>` : ''}
      </div>
    `;
  }).join('');

  const resBox = document.getElementById('reserved-enchant-box');
  if (p.reservedEnchant) {
    resBox.style.display = 'block';
    document.getElementById('active-player-reserved').innerHTML = `
      <div class="mini-card">
        <div class="card-main">
          <div class="card-name">${iconHtml(p.reservedEnchant.type)} ${p.reservedEnchant.name}</div>
          <div class="card-desc">Cost: ${formatCost(p.reservedEnchant.cost, p.reservedEnchant.noCoins)}</div>
        </div>
      </div>`;
  } else {
    resBox.style.display = 'none';
  }

  // Game Log
  document.getElementById('game-log').innerHTML = G.log.map(entry => `<div class="log-entry">${entry}</div>`).join('');
}

function showModal(title, bodyHtml) {
  document.getElementById('modal-title').innerHTML = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-footer').innerHTML = `<button class="btn-secondary" onclick="closeModal()">Close</button>`;
  document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

document.getElementById('btn-new-game').addEventListener('click', initNewGame);
document.getElementById('btn-rules').addEventListener('click', () => {
  showModal('📖 Official Flamecraft Rules & Card Reference', `
    <p><strong>Goal:</strong> Earn the most Reputation (❤️) by placing Artisan Dragons, casting Enchantments, and fulfilling Fancy Dragon objectives.</p>
    <hr style="margin:0.5rem 0"/>
    <p><strong>On Your Turn:</strong></p>
    <ol style="margin-left:1.2rem">
      <li><strong>Visit a Different Shop:</strong> Move your Dragon marker to any Shop in Town. Give 1 Good/Coin to each other player already there.</li>
      <li><strong>Choose Gather OR Enchant:</strong>
        <ul>
          <li><strong>Gather:</strong> (1) Collect 1 item from the Shop + 1 Good from each Enchantment & Dragon there; (2) Optionally place 1 Artisan Dragon into a matching slot & gain the slot reward; (3) Optionally Fire Up 1 Dragon there; (4) Optionally use the Shop's special ability.</li>
          <li><strong>Enchant:</strong> (1) Pay Goods/Coins to cast a matching Enchantment (max 3 per Shop) and score its rewards; (2) Optionally Fire Up ALL Artisan Dragons at that Shop in any order.</li>
        </ul>
      </li>
      <li><strong>End of Turn Cleanup:</strong> Reveal any new Shops opened when a Shop filled (up to 14 in Town), discard down to max 6 Artisan Dragons and max 7 of each Good, and refill the Park (5) and Enchantment Row (5).</li>
    </ol>
  `);
});

window.addEventListener('DOMContentLoaded', initNewGame);
