// data.js - Complete Canonical Flamecraft Database

export const GOODS = ['bread', 'meat', 'iron', 'crystal', 'plant', 'potion'];

export const GOOD_LABELS = {
  bread: 'Bread',
  meat: 'Meat',
  iron: 'Iron',
  crystal: 'Crystal',
  plant: 'Plant',
  potion: 'Potion',
  coin: 'Coin',
  wild: 'Wild',
  dragon: 'Artisan Dragon',
  fancy: 'Fancy Dragon',
  heart: 'Reputation'
};

export const ARTISAN_ABILITIES = {
  bread: {
    title: 'Draw Artisan Dragon',
    desc: 'Draw 1 Artisan Dragon of your choice from the Park or the top of the deck.'
  },
  meat: {
    title: 'Place Artisan Dragon',
    desc: 'Place 1 Artisan Dragon from your hand into any matching empty slot in Town and gain its slot reward.'
  },
  iron: {
    title: 'Gain 2 Matching Goods',
    desc: 'Gain 2 of the same Good offered by this Shop or an Artisan Dragon here.'
  },
  crystal: {
    title: 'Gain 3 Different Goods',
    desc: 'Gain 3 different Goods of your choice from the general supply.'
  },
  plant: {
    title: 'Gift a Good for +2 Rep',
    desc: 'Give 1 Good or Coin from your supply to another player to gain 2 Reputation.'
  },
  potion: {
    title: 'Swap Artisan Dragons',
    desc: 'Swap this Dragon with any other Artisan Dragon in Town (at a different Shop) or the Park.'
  }
};

// 6 Starter Artisan Dragons (Trumpet Pennant icon)
export const STARTER_DRAGONS = [
  { id: 'sd_pan', name: 'Pan', type: 'bread', starter: true },
  { id: 'sd_tannin', name: 'Tannin', type: 'potion', starter: true },
  { id: 'sd_wingnut', name: 'Wingnut', type: 'iron', starter: true },
  { id: 'sd_brightgem', name: 'Brightgem', type: 'crystal', starter: true },
  { id: 'sd_hickory', name: 'Hickory', type: 'meat', starter: true },
  { id: 'sd_twig', name: 'Twig', type: 'plant', starter: true }
];

// 36 Regular Artisan Dragons (6 sets of 6)
export const REGULAR_DRAGONS = [
  // Bread
  { id: 'ad_cinnabun', name: 'Cinnabun', type: 'bread', set: 1 },
  { id: 'ad_cookie', name: 'Cookie', type: 'bread', set: 2 },
  { id: 'ad_fondue', name: 'Fondue', type: 'bread', set: 3 },
  { id: 'ad_honey', name: 'Honey', type: 'bread', set: 4 },
  { id: 'ad_loaf', name: 'Loaf', type: 'bread', set: 5 },
  { id: 'ad_suzette', name: 'Suzette', type: 'bread', set: 6 },
  // Potion
  { id: 'ad_earl', name: 'Earl', type: 'potion', set: 1 },
  { id: 'ad_elderberry', name: 'Elderberry', type: 'potion', set: 2 },
  { id: 'ad_jasmine', name: 'Jasmine', type: 'potion', set: 3 },
  { id: 'ad_lavender', name: 'Lavender', type: 'potion', set: 4 },
  { id: 'ad_thistle', name: 'Thistle', type: 'potion', set: 5 },
  { id: 'ad_venti', name: 'Venti', type: 'potion', set: 6 },
  // Iron
  { id: 'ad_cole', name: 'Cole', type: 'iron', set: 1 },
  { id: 'ad_flint', name: 'Flint', type: 'iron', set: 2 },
  { id: 'ad_patina', name: 'Patina', type: 'iron', set: 3 },
  { id: 'ad_roxanne', name: 'Roxanne', type: 'iron', set: 4 },
  { id: 'ad_rusty', name: 'Rusty', type: 'iron', set: 5 },
  { id: 'ad_shale', name: 'Shale', type: 'iron', set: 6 },
  // Crystal
  { id: 'ad_deathfang', name: 'Deathfang', type: 'crystal', set: 1 },
  { id: 'ad_frostfire', name: 'Frostfire', type: 'crystal', set: 2 },
  { id: 'ad_jewelheart', name: 'Jewelheart', type: 'crystal', set: 3 },
  { id: 'ad_moonbeam', name: 'Moonbeam', type: 'crystal', set: 4 },
  { id: 'ad_opalwing', name: 'Opalwing', type: 'crystal', set: 5 },
  { id: 'ad_silverscale', name: 'Silverscale', type: 'crystal', set: 6 },
  // Meat
  { id: 'ad_brisket', name: 'Brisket', type: 'meat', set: 1 },
  { id: 'ad_cutlet', name: 'Cutlet', type: 'meat', set: 2 },
  { id: 'ad_flambe', name: 'Flambé', type: 'meat', set: 3 },
  { id: 'ad_hotdog', name: 'Hot Dog', type: 'meat', set: 4 },
  { id: 'ad_potato', name: 'Potato', type: 'meat', set: 5 },
  { id: 'ad_skewart', name: 'Skewart', type: 'meat', set: 6 },
  // Plant
  { id: 'ad_blossom', name: 'Blossom', type: 'plant', set: 1 },
  { id: 'ad_dandelion', name: 'Dandelion', type: 'plant', set: 2 },
  { id: 'ad_herb', name: 'Herb', type: 'plant', set: 3 },
  { id: 'ad_lotus', name: 'Lotus', type: 'plant', set: 4 },
  { id: 'ad_mulch', name: 'Mulch', type: 'plant', set: 5 },
  { id: 'ad_olive', name: 'Olive', type: 'plant', set: 6 }
];

// 6 Starter Shops
export const STARTER_SHOPS = [
  {
    id: 'shop_critical_rolls',
    name: 'Critical Rolls',
    type: 'bread',
    starter: true,
    abilityText: 'Starter Bakery (No special shop ability).',
    slots: [
      { types: ['bread'], reward: { heart: 1 } },
      { types: ['bread', 'plant'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_potable_potions',
    name: 'Potable Potions',
    type: 'potion',
    starter: true,
    abilityText: 'Starter Apothecary (No special shop ability).',
    slots: [
      { types: ['potion'], reward: { heart: 1 } },
      { types: ['potion', 'crystal'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_smith_mart',
    name: 'Smith Mart',
    type: 'iron',
    starter: true,
    abilityText: 'Starter Forge (No special shop ability).',
    slots: [
      { types: ['iron'], reward: { heart: 1 } },
      { types: ['iron', 'meat'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_fragile_reptile',
    name: 'Fragile Reptile',
    type: 'crystal',
    starter: true,
    abilityText: 'Starter Jeweler (No special shop ability).',
    slots: [
      { types: ['crystal'], reward: { heart: 1 } },
      { types: ['crystal', 'iron'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_draco_bell',
    name: 'Draco Bell',
    type: 'meat',
    starter: true,
    abilityText: 'Starter Grill (No special shop ability).',
    slots: [
      { types: ['meat'], reward: { heart: 1 } },
      { types: ['meat', 'bread'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_hello_nursery',
    name: 'Hello Nursery',
    type: 'plant',
    starter: true,
    abilityText: 'Starter Greenhouse (No special shop ability).',
    slots: [
      { types: ['plant'], reward: { heart: 1 } },
      { types: ['plant', 'potion'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  }
];

// 28 Named Town Shops (Grouped by their 7 setup piles: 6 Goods + 1 Special)
export const TOWN_SHOPS = [
  // PILE 1: BREAD (3)
  {
    id: 'shop_drake_of_cakes',
    name: 'Drake of Cakes',
    pile: 'bread',
    type: 'bread',
    abilityId: 'drake_of_cakes',
    abilityText: 'Pay 2 Bread to take up to 2 Artisan Dragons from the Park.',
    slots: [
      { types: ['bread', 'crystal'], reward: { heart: 3 } },
      { types: ['bread'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_la_petite_dragonne',
    name: 'La Petite Dragonne',
    pile: 'bread',
    type: 'bread',
    abilityId: 'la_petite_dragonne',
    abilityText: 'Place an Artisan Dragon here to gain Coins instead of Rep OR if full, take all 3 Dragons here into your hand.',
    slots: [
      { types: ['bread'], reward: { heart: 3 } },
      { types: ['bread', 'potion'], reward: { heart: 3 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_guilty_treasures',
    name: 'Guilty Treasures',
    pile: 'bread',
    type: 'bread',
    abilityId: 'guilty_treasures',
    abilityText: 'Gift 1 Bread or Coin to another player to gain 1 Coin and 2 Reputation.',
    slots: [
      { types: ['bread', 'meat'], reward: { heart: 3 } },
      { types: ['bread'], reward: { coin: 1, heart: 1 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },

  // PILE 2: POTION (3)
  {
    id: 'shop_draconic_tonic',
    name: 'Draconic Tonic',
    pile: 'potion',
    type: 'potion',
    abilityId: 'draconic_tonic',
    abilityText: 'Reserve 1 Enchantment (if you have none), then you may immediately pay its cost to score its rewards without casting it on a shop.',
    slots: [
      { types: ['potion', 'crystal'], reward: { heart: 3 } },
      { types: ['potion'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_funky_brewsters',
    name: 'Funky Brewsters',
    pile: 'potion',
    type: 'potion',
    abilityId: 'funky_brewsters',
    abilityText: 'Return 1 Artisan Dragon here to your hand, replace it with 1 from the Park (ignoring slot icon), and Fire the new Dragon.',
    slots: [
      { types: ['potion'], reward: { coin: 1 } },
      { types: ['potion', 'plant'], reward: { heart: 3 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_spellfire_springs',
    name: 'Spellfire Springs',
    pile: 'potion',
    type: 'potion',
    abilityId: 'spellfire_springs',
    abilityText: 'Pay 2 Potions to Fire the last Artisan Dragon you fired here two more times.',
    slots: [
      { types: ['plant', 'crystal'], reward: { heart: 3 } },
      { types: ['potion'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },

  // PILE 3: IRON (3)
  {
    id: 'shop_gnome_depot',
    name: 'Gnome Depot',
    pile: 'iron',
    type: 'iron',
    abilityId: 'gnome_depot',
    abilityText: 'Pay 8 of one Good type (Coins may substitute) to gain 8 Reputation.',
    slots: [
      { types: ['iron'], reward: { heart: 3 } },
      { types: ['meat'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_saving_throw',
    name: 'Saving Throw',
    pile: 'iron',
    type: 'iron',
    abilityId: 'saving_throw',
    abilityText: 'Place an Artisan Dragon from your hand anywhere in Town; if this fills that Shop, gain +4 Reputation.',
    slots: [
      { types: ['plant', 'meat'], reward: { heart: 3 } },
      { types: ['iron'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_the_savage_beast',
    name: 'The Savage Beast',
    pile: 'iron',
    type: 'iron',
    abilityId: 'the_savage_beast',
    abilityText: 'Gain 1 Good matching each Artisan Dragon in the Park OR Fire all Dragons of 1 type at this Shop.',
    slots: [
      { types: ['iron', 'potion'], reward: { heart: 3 } },
      { types: ['iron'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },

  // PILE 4: CRYSTAL (3)
  {
    id: 'shop_tip_the_scales',
    name: 'Tip the Scales',
    pile: 'crystal',
    type: 'crystal',
    abilityId: 'tip_the_scales',
    abilityText: 'Pay 2 Crystals to convert up to 3 different Goods into 1 Coin and 1 Reputation each.',
    slots: [
      { types: ['crystal'], reward: { heart: 3 } },
      { types: ['crystal', 'iron'], reward: { coin: 1 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop_touch_o_glass',
    name: "Touch o' Glass",
    pile: 'crystal',
    type: 'crystal',
    abilityId: 'touch_o_glass',
    abilityText: 'Fire 1 Artisan Dragon from your hand; you may then gift that Dragon to another player for 5 Reputation.',
    slots: [
      { types: ['bread', 'crystal'], reward: { heart: 3 } },
      { types: ['crystal'], reward: { heart: 1, coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_crystal_palace',
    name: 'Sublime Shine',
    pile: 'crystal',
    type: 'crystal',
    abilityId: 'sublime_shine',
    abilityText: 'Pay 3 Crystals to gain 4 Reputation and draw 1 Fancy Dragon.',
    slots: [
      { types: ['crystal', 'potion'], reward: { heart: 3 } },
      { types: ['crystal'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },

  // PILE 5: MEAT (3)
  {
    id: 'shop_fogo_de_char',
    name: 'Fogo de Char',
    pile: 'meat',
    type: 'meat',
    abilityId: 'fogo_de_char',
    abilityText: 'Place an Artisan Dragon here ignoring slot icons; gain the slot reward plus 2 Coins.',
    slots: [
      { types: ['meat'], reward: { coin: 1 } },
      { types: ['meat', 'iron'], reward: { heart: 3 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop_full_plate_buffet',
    name: 'Full Plate Buffet',
    pile: 'meat',
    type: 'meat',
    abilityId: 'full_plate_buffet',
    abilityText: 'Pay 3 Meat to gain 1 of each Good produced by all Shops in Town (up to 4 different Goods) and 2 Reputation.',
    slots: [
      { types: ['meat', 'bread'], reward: { heart: 3 } },
      { types: ['meat'], reward: { heart: 3 } },
      { types: ['wild'], reward: { coin: 1 } }
    ]
  },
  {
    id: 'shop_pizza_coven',
    name: 'Pizza Coven',
    pile: 'meat',
    type: 'meat',
    abilityId: 'pizza_coven',
    abilityText: 'Place matching Goods from your supply onto any Park Dragons for 1 Rep each; if all 5 Park Dragons have Goods, gain 1 Coin.',
    slots: [
      { types: ['plant', 'meat'], reward: { fancy: 1 } },
      { types: ['meat'], reward: { heart: 3 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },

  // PILE 6: PLANT (3)
  {
    id: 'shop_oh_my_gourd',
    name: 'Oh My Gourd!',
    pile: 'plant',
    type: 'plant',
    abilityId: 'oh_my_gourd',
    abilityText: 'Gain 2x the printed reward from an empty slot here OR gain 2x Goods from each Artisan Dragon here.',
    slots: [
      { types: ['plant'], reward: { coin: 1 } },
      { types: ['plant', 'bread'], reward: { heart: 2 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop_sage_of_sage',
    name: 'Sage of Sage',
    pile: 'plant',
    type: 'plant',
    abilityId: 'sage_of_sage',
    abilityText: 'Gain 3 Goods listed in the cost of 1 Enchantment in the row (or your reserve); you may reserve that Enchantment.',
    slots: [
      { types: ['plant', 'potion'], reward: { heart: 3 } },
      { types: ['plant'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_plant_haven',
    name: 'Botanical Baubles',
    pile: 'plant',
    type: 'plant',
    abilityId: 'botanical_baubles',
    abilityText: 'Gift up to 2 Plant Goods to other players to gain 3 Reputation per Good gifted.',
    slots: [
      { types: ['plant', 'crystal'], reward: { heart: 3 } },
      { types: ['plant'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },

  // PILE 7: SPECIAL - WILD, COIN, DRAGON (10)
  {
    id: 'shop_bizarre_bazaar',
    name: 'Bizarre Bazaar',
    pile: 'special',
    type: 'wild',
    abilityId: 'bizarre_bazaar',
    abilityText: 'Reveal and score 1 of your fulfilled Fancy Dragons (Sun or Moon, scored as if game ended), then draw 1 Fancy Dragon.',
    slots: [
      { types: ['bread', 'meat'], reward: { heart: 3 } },
      { types: ['iron', 'crystal'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_eternal_flame',
    name: 'Eternal Flame',
    pile: 'special',
    type: 'wild',
    onReveal: 'eternal_flame_reveal',
    abilityId: 'eternal_flame',
    abilityText: 'On Reveal: Fill slots 1 & 3 from deck. Ability: Gain 3 / 5 / 6 Reputation for 1 / 2 / 3 Enchantments here.',
    slots: [
      { types: ['wild'], reward: { heart: 2 } },
      { types: ['wild'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_scale_mail_post',
    name: 'Scale Mail Post',
    pile: 'special',
    type: 'wild',
    abilityId: 'scale_mail_post',
    abilityText: 'Draw 2 Fancy Dragons; keep 1 and gift the other to another player to gain 4 Reputation.',
    slots: [
      { types: ['plant', 'potion'], reward: { heart: 3 } },
      { types: ['bread', 'iron'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_nunyas_beeswax',
    name: "Nunya's Beeswax",
    pile: 'special',
    type: 'wild',
    abilityId: 'nunyas_beeswax',
    abilityText: 'Gain 1 Coin per Artisan Dragon here OR pay 1 Coin to Fire an Artisan Dragon anywhere in Town.',
    slots: [
      { types: ['plant', 'meat'], reward: { heart: 3 } },
      { types: ['crystal', 'potion'], reward: { heart: 3 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop_flagons_and_dragons',
    name: 'Flagons & Dragons',
    pile: 'special',
    type: 'wild',
    noEntryGift: true,
    abilityId: 'flagons_and_dragons',
    abilityText: 'Players do not pay entry gifts to visit here. Ability: Gain 2 Reputation for each player token currently at this Shop.',
    slots: [
      { types: ['bread', 'potion'], reward: { heart: 3 } },
      { types: ['meat', 'iron'], reward: { coin: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_dragon_alley',
    name: 'Dragon Alley',
    pile: 'special',
    type: 'coin',
    noEnchant: true,
    abilityId: 'dragon_alley',
    abilityText: 'Leave 1 Coin here to gain 3 Reputation, OR take all Coins currently stored on Dragon Alley.',
    slots: [
      { types: ['crystal', 'potion'], reward: { heart: 3 } },
      { types: ['iron', 'plant'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 3 } }
    ]
  },
  {
    id: 'shop_maw_and_paws',
    name: "Maw & Paw's",
    pile: 'special',
    type: 'coin',
    noEnchant: true,
    abilityId: 'maw_and_paws',
    abilityText: 'Flip up to 2 Coins (keep Coins): HEADS = draw 1 Artisan Dragon from deck; TAILS = draw 1 Fancy Dragon.',
    slots: [
      { types: ['bread', 'plant'], reward: { heart: 3 } },
      { types: ['meat', 'crystal'], reward: { heart: 3 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  },
  {
    id: 'shop_wishing_well',
    name: 'Wishing Well',
    pile: 'special',
    type: 'coin3',
    noEnchant: true,
    abilityId: 'wishing_well',
    abilityText: 'Produces 3 Coins when Gathering. Ability: Flip up to 3 Coins; HEADS = +2 Rep (keep Coin), TAILS = lose Coin.',
    slots: [
      { types: ['iron', 'crystal'], reward: { heart: 3 } },
      { types: ['potion', 'plant'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { heart: 2 } }
    ]
  },
  {
    id: 'shop_draggin_tail_roost',
    name: "Draggin' Tail Roost",
    pile: 'special',
    type: 'dragon',
    noEnchant: true,
    facedownSlots: true,
    abilityId: 'draggin_tail_roost',
    abilityText: 'Produces 1 Artisan Dragon. Dragons placed here sit facedown. Ability: Fire 1 Park Dragon, then draw it into your hand.',
    slots: [
      { types: ['wild'], reward: { heart: 3 } },
      { types: ['wild'], reward: { fancy: 1 } },
      { types: ['wild'], reward: { coin: 2 } }
    ]
  },
  {
    id: 'shop_sew_cute',
    name: 'Sew Cute',
    pile: 'special',
    type: 'dragon',
    noEnchant: true,
    abilityId: 'sew_cute',
    abilityText: 'Produces 1 Artisan Dragon. Ability: Gain 1 Reputation for every Dragon in Town matching the type of 1 Dragon in your hand.',
    slots: [
      { types: ['bread', 'potion'], reward: { heart: 3 } },
      { types: ['meat', 'plant'], reward: { coin: 1 } },
      { types: ['wild'], reward: { fancy: 1 } }
    ]
  }
];

// 36 Enchantment Cards: 18 Purple Deck (Standard) & 18 Golden Deck (Variable / Advanced)
export const ENCHANTMENTS = {
  purple: [
    // Bread (3)
    { id: 'ep_creme', name: 'Crème Brûlée', type: 'bread', cost: { bread: 3, crystal: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_fairy', name: "Fairy's Jubilee", type: 'bread', cost: { bread: 3, plant: 1, potion: 1 }, reward: { heart: 6, dragon: 1 } },
    { id: 'ep_impanadas', name: "Imp'anadas", type: 'bread', noCoin: true, cost: { bread: 2, meat: 2 }, reward: { heart: 6 } },
    // Potion (3)
    { id: 'ep_dwarven', name: 'Dwarven Stout', type: 'potion', cost: { potion: 3, iron: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_elfspresso', name: 'Elfspresso', type: 'potion', cost: { potion: 3, bread: 1, plant: 1 }, reward: { heart: 6, fancy: 1 } },
    { id: 'ep_hobbichino', name: 'Hobbichino', type: 'potion', noCoin: true, cost: { potion: 2, crystal: 2 }, reward: { heart: 6 } },
    // Iron (3)
    { id: 'ep_joeforgeman', name: 'Joe Forgeman', type: 'iron', cost: { iron: 3, meat: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_smeltingpot', name: 'Smelting Pot', type: 'iron', cost: { iron: 3, crystal: 1, potion: 1 }, reward: { heart: 6, dragon: 1 } },
    { id: 'ep_spellcast', name: 'Spell-Cast Iron', type: 'iron', noCoin: true, cost: { iron: 2, bread: 2 }, reward: { heart: 6 } },
    // Crystal (3)
    { id: 'ep_heartflame', name: 'Heart of Flame', type: 'crystal', cost: { crystal: 3, potion: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_mirrortruth', name: 'Mirror of Truth', type: 'crystal', cost: { crystal: 3, iron: 1, meat: 1 }, reward: { heart: 6, fancy: 1 } },
    { id: 'ep_ringdestiny', name: 'Ring of Destiny', type: 'crystal', noCoin: true, cost: { crystal: 2, plant: 2 }, reward: { heart: 6 } },
    // Meat (3)
    { id: 'ep_displacer', name: 'Displacer Beef', type: 'meat', cost: { meat: 3, bread: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_flamberge', name: 'Le Flamberge', type: 'meat', cost: { meat: 3, iron: 1, crystal: 1 }, reward: { heart: 6, dragon: 1 } },
    { id: 'ep_smokedgorgon', name: 'Smoked Gorgon', type: 'meat', noCoin: true, cost: { meat: 2, potion: 2 }, reward: { heart: 6 } },
    // Plant (3)
    { id: 'ep_orkish', name: 'Orkish Orchids', type: 'plant', cost: { plant: 3, meat: 1 }, reward: { heart: 5, coin: 1 } },
    { id: 'ep_willowwisp', name: 'Willow Wisp', type: 'plant', cost: { plant: 3, bread: 1, crystal: 1 }, reward: { heart: 6, fancy: 1 } },
    { id: 'ep_wraithrose', name: 'Wraith Rose', type: 'plant', noCoin: true, cost: { plant: 2, iron: 2 }, reward: { heart: 6 } }
  ],
  golden: [
    // Bread (3)
    { id: 'eg_minotarts', name: 'Mino-Tarts', type: 'bread', variablePair: ['bread', 'meat'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_satyramisu', name: 'Satyramisu', type: 'bread', cost: { bread: 4, potion: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_unicorn', name: 'Unicorn Flakes', type: 'bread', cost: { bread: 2, crystal: 1, plant: 1 }, reward: { heart: 4, fancy: 1 } },
    // Potion (3)
    { id: 'eg_mertini', name: 'Mertini', type: 'potion', variablePair: ['potion', 'crystal'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_owlbeer', name: 'Owlbeer', type: 'potion', cost: { potion: 4, plant: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_runeshine', name: 'Runeshine', type: 'potion', cost: { potion: 2, iron: 1, bread: 1 }, reward: { heart: 4, dragon: 1 } },
    // Iron (3)
    { id: 'eg_anvilchorus', name: 'Anvil Chorus', type: 'iron', variablePair: ['iron', 'potion'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_heavymetal', name: 'Heavy Metal', type: 'iron', cost: { iron: 4, crystal: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_ironmaidens', name: 'Iron Maidens', type: 'iron', cost: { iron: 2, meat: 1, plant: 1 }, reward: { heart: 4, fancy: 1 } },
    // Crystal (3)
    { id: 'eg_eyebeholder', name: 'Eye of Beholder', type: 'crystal', variablePair: ['crystal', 'iron'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_saberlight', name: 'Saber of Light', type: 'crystal', cost: { crystal: 4, bread: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_shardthra', name: 'Shard of Thra', type: 'crystal', cost: { crystal: 2, potion: 1, meat: 1 }, reward: { heart: 4, dragon: 1 } },
    // Meat (3)
    { id: 'eg_filetminion', name: 'Filet Minion', type: 'meat', variablePair: ['meat', 'plant'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_krakenkatsu', name: 'Kraken Katsu', type: 'meat', cost: { meat: 4, iron: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_pheephipho', name: 'Phee-Phi-Pho', type: 'meat', cost: { meat: 2, bread: 1, crystal: 1 }, reward: { heart: 4, fancy: 1 } },
    // Plant (3)
    { id: 'eg_hydraponics', name: 'Hydra-Ponics', type: 'plant', variablePair: ['plant', 'bread'], maxSets: 4, heartsPerSet: [0, 2, 5, 8], reward: {} },
    { id: 'eg_snapdragons', name: 'Snap Dragons', type: 'plant', cost: { plant: 4, meat: 1 }, reward: { heart: 6, coin: 1 } },
    { id: 'eg_thacosalad', name: 'Thaco Salad', type: 'plant', cost: { plant: 2, potion: 1, iron: 1 }, reward: { heart: 4, dragon: 1 } }
  ]
};

// All 36 Fancy Dragons (17 Sun Dragons + 19 Moon Dragons)
export const FANCY_DRAGONS = [
  // 17 SUN DRAGONS (Scored during your turn when fulfilled)
  { id: 'fd_buttercup', name: 'Buttercup', celestial: 'sun', desc: 'Have at least 1 of each of the 6 Goods in your supply: Gain 4 Rep & 1 Coin.', reward: { heart: 4, coin: 1 }, check: (p) => GOODS.every(g => p.goods[g] >= 1) },
  { id: 'fd_chonkers', name: 'Chonkers', celestial: 'sun', desc: 'Spend 4 Bread or Meat (any combination): Gain 5 Reputation.', spendType: 'chonkers', reward: { heart: 5 }, check: (p) => (p.goods.bread + p.goods.meat) >= 4 },
  { id: 'fd_dazzle', name: 'Dazzle', celestial: 'sun', desc: 'Spend 4 Crystal or Potion (any combination): Gain 5 Reputation.', spendType: 'dazzle', reward: { heart: 5 }, check: (p) => (p.goods.crystal + p.goods.potion) >= 4 },
  { id: 'fd_frazzle', name: 'Frazzle', celestial: 'sun', desc: 'There are at least 3 Shops in Town with 2+ Enchantments: Gain 5 Reputation.', reward: { heart: 5 }, check: (p, state) => state.town.filter(s => s.enchantments.length >= 2).length >= 3 },
  { id: 'fd_goldrush', name: 'Goldrush', celestial: 'sun', desc: 'Gain 2 Reputation for every Coin-reward slot in Town currently filled with a Dragon (min 1).', dynamic: 'goldrush', check: (p, state) => state.town.some(s => s.id !== 'shop_dragon_alley' && s.slots.some((sl, idx) => sl.reward.coin && s.dragons[idx])) },
  { id: 'fd_greenhorn', name: 'Greenhorn', celestial: 'sun', desc: 'Spend 4 Plant or Iron (any combination): Gain 5 Reputation.', spendType: 'greenhorn', reward: { heart: 5 }, check: (p) => (p.goods.plant + p.goods.iron) >= 4 },
  { id: 'fd_hocus', name: 'Hocus', celestial: 'sun', desc: 'Visit a Shop with 3 Artisan Dragons of different types: Gain 4 Reputation.', reward: { heart: 4 }, check: (p, state) => { const s = state.town[p.shopIndex]; if (!s) return false; const types = s.dragons.filter(Boolean).map(d => d.type); return types.length === 3 && new Set(types).size === 3; } },
  { id: 'fd_nightbrite', name: 'Nightbrite', celestial: 'sun', desc: 'Have 4 Artisan Dragons in your hand of different types: Gain 3 Rep & 1 Coin.', reward: { heart: 3, coin: 1 }, check: (p) => new Set(p.hand.map(d => d.type)).size >= 4 },
  { id: 'fd_pinkytoe', name: 'Pinkytoe', celestial: 'sun', desc: 'Have 4 Coins in your personal supply: Gain 4 Reputation (keep Coins).', reward: { heart: 4 }, check: (p) => p.coins >= 4 },
  { id: 'fd_pocus', name: 'Pocus', celestial: 'sun', desc: 'Visit a Shop with at least 2 Dragons of the same type: Gain 3 Reputation.', reward: { heart: 3 }, check: (p, state) => { const s = state.town[p.shopIndex]; if (!s) return false; const types = s.dragons.filter(Boolean).map(d => d.type); return types.length >= 2 && new Set(types).size < types.length; } },
  { id: 'fd_rainbow', name: 'Rainbow', celestial: 'sun', desc: 'Spend 1 of each of the 6 Goods: Gain 8 Reputation.', spendType: 'rainbow', reward: { heart: 8 }, check: (p) => GOODS.every(g => p.goods[g] >= 1) },
  { id: 'fd_sparkle', name: 'Sparkle', celestial: 'sun', desc: 'Enchant a Shop this turn: Gain 2 Reputation for each Dragon at that Shop.', dynamic: 'sparkle', check: (p, state) => state.turnEnchanted && state.town[p.shopIndex]?.dragons.filter(Boolean).length > 0 },
  { id: 'fd_starburst', name: 'Starburst', celestial: 'sun', desc: 'Have at least 12 total Goods in your supply: Gain 4 Reputation.', reward: { heart: 4 }, check: (p) => GOODS.reduce((a, g) => a + p.goods[g], 0) >= 12 },
  { id: 'fd_sunlight', name: 'Sunlight', celestial: 'sun', desc: 'Have 5 Artisan Dragons in your hand: Gain 3 Reputation & 1 Coin.', reward: { heart: 3, coin: 1 }, check: (p) => p.hand.length >= 5 },
  { id: 'fd_taylor', name: 'Taylor', celestial: 'sun', desc: 'Place a Dragon this turn: Gain 1 Rep per Dragon of that type at this Shop (including the placed one).', dynamic: 'taylor', check: (p, state) => Boolean(state.lastPlacedType) },
  { id: 'fd_twinkle', name: 'Twinkle', celestial: 'sun', desc: 'Enchant a Shop this turn: Gain 1 Rep per Enchantment in Town of that type (max 6).', dynamic: 'twinkle', check: (p, state) => state.turnEnchanted },
  { id: 'fd_westley', name: 'Westley', celestial: 'sun', desc: 'Fill a Shop this turn: Gain 4 Reputation & 1 Coin.', reward: { heart: 4, coin: 1 }, check: (p, state) => state.turnFilledShop },

  // 19 MOON DRAGONS (Scored at the end of the game)
  { id: 'fd_sweetie', name: 'Sweetie', celestial: 'moon', desc: '1 Rep per Bread Dragon in Town (+2 Rep if Bread is tied/most common Dragon in Town).', dragonMajority: 'bread' },
  { id: 'fd_umami', name: 'Umami', celestial: 'moon', desc: '1 Rep per Meat Dragon in Town (+2 Rep if Meat is tied/most common Dragon in Town).', dragonMajority: 'meat' },
  { id: 'fd_savannah', name: 'Savannah', celestial: 'moon', desc: '1 Rep per Plant Dragon in Town (+2 Rep if Plant is tied/most common Dragon in Town).', dragonMajority: 'plant' },
  { id: 'fd_jitters', name: 'Jitters', celestial: 'moon', desc: '1 Rep per Potion Dragon in Town (+2 Rep if Potion is tied/most common Dragon in Town).', dragonMajority: 'potion' },
  { id: 'fd_shadow', name: 'Shadow', celestial: 'moon', desc: '1 Rep per Iron Dragon in Town (+2 Rep if Iron is tied/most common Dragon in Town).', dragonMajority: 'iron' },
  { id: 'fd_gemma', name: 'Gemma', celestial: 'moon', desc: '1 Rep per Crystal Dragon in Town (+2 Rep if Crystal is tied/most common Dragon in Town).', dragonMajority: 'crystal' },

  { id: 'fd_toasty', name: 'Toasty', celestial: 'moon', desc: '1 Rep per Bread in your supply (+3 Rep if you have the most Bread, min 3).', goodMajority: 'bread' },
  { id: 'fd_carnie', name: 'Carnie', celestial: 'moon', desc: '1 Rep per Meat in your supply (+3 Rep if you have the most Meat, min 3).', goodMajority: 'meat' },
  { id: 'fd_forrest', name: 'Forrest', celestial: 'moon', desc: '1 Rep per Plant in your supply (+3 Rep if you have the most Plant, min 3).', goodMajority: 'plant' },
  { id: 'fd_elix', name: 'Elix', celestial: 'moon', desc: '1 Rep per Potion in your supply (+3 Rep if you have the most Potion, min 3).', goodMajority: 'potion' },
  { id: 'fd_ajax', name: 'Ajax', celestial: 'moon', desc: '1 Rep per Iron in your supply (+3 Rep if you have the most Iron, min 3).', goodMajority: 'iron' },
  { id: 'fd_zircon', name: 'Zircon', celestial: 'moon', desc: '1 Rep per Crystal in your supply (+3 Rep if you have the most Crystal, min 3).', goodMajority: 'crystal' },

  { id: 'fd_bubu', name: 'Bubu', celestial: 'moon', desc: '2 Reputation for every Sun Fancy Dragon you have scored.', customMoon: (p) => p.fancy.filter(f => f.celestial === 'sun' && f.scored).length * 2 },
  { id: 'fd_buddy', name: 'Buddy', celestial: 'moon', desc: '2 Reputation for every Artisan Dragon remaining in your hand.', customMoon: (p) => p.hand.length * 2 },
  { id: 'fd_matches', name: 'Matches', celestial: 'moon', desc: '1 Reputation for every Enchantment tucked at Shops in Town (max 8).', customMoon: (p, state) => Math.min(8, state.town.reduce((a, s) => a + s.enchantments.length, 0)) },
  { id: 'fd_shimmer', name: 'Shimmer', celestial: 'moon', desc: '2 Reputation for every fully-filled Shop (all 3 Dragon slots occupied) in Town (max 8).', customMoon: (p, state) => Math.min(8, state.town.filter(s => s.dragons.filter(Boolean).length === 3).length * 2) },
  { id: 'fd_steven', name: 'Steven', celestial: 'moon', desc: '1 Reputation for each Good type of which you have an EVEN number (0 counts as even).', customMoon: (p) => GOODS.filter(g => p.goods[g] % 2 === 0).length },
  { id: 'fd_talisman', name: 'Talisman', celestial: 'moon', desc: '2 Reputation for every Moon Fancy Dragon you own (including Talisman).', customMoon: (p) => p.fancy.filter(f => f.celestial === 'moon').length * 2 },
  { id: 'fd_todd', name: 'Todd', celestial: 'moon', desc: '1 Reputation for each Good type of which you have an ODD number.', customMoon: (p) => GOODS.filter(g => p.goods[g] % 2 === 1).length }
];
