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
  { id: 'fd
