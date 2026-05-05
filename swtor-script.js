// ============================================
// SWTOR RP - Connected Skill Tree Logic
// ============================================

const state = {
    isLocked: false,
    totalXP: 25,
    spentXP: 0,
    maxXP: 125,
    history: [],
    lastTier: 1,
    tiers: {
        1: { threshold: 0 },
        2: { threshold: 30 },
        3: { threshold: 55 },
        4: { threshold: 75 },
        5: { threshold: 100 }
    },
    
    // All skills defined with connections
    skills: [
        // TIER 5 - High Command
        { id: 'resilience', tier: 5, icon: 'icons/resilience.webp', row: 0, col: 0,  rank: 0, type: 'normal', label: 'Resilience', connectsTo: [], effects: { xp: -3, hp: +1 },description: 'This skill represents a character’s physical and mental tenacity, such as the ability to endure or shrug off injuries as well as mental effects that harm.' },
        { id: 'annihilation', tier: 5, icon: 'icons/annihilation.webp', row: 0, col: 6,  rank: 0, type: 'normal', label: 'Annihilation', connectsTo: [], effects: { xp: -4, rb: +1 } },
        { id: 'bioengineering', tier: 5, icon: 'icons/bioengineering.webp', row: 0, col: 8,  rank: 0, type: 'normal', label: 'BioEngineering', connectsTo: [], effects: { xp: -4, rb: +1 } },
        { id: 'authority', tier: 5, icon: 'icons/authority.webp', row: 0, col: 11,  rank: 0, type: 'normal', label: 'Authority', connectsTo: [] , effects: { xp: -4, rb: +1 }, description: 'This skill represents a character’s ability to utilise their actual or perceived status to influence and direct the actions of others. Such as through the issuing of orders. '},
        { id: 'broken_chains', tier: 5, icon: 'icons/broken_chains.png', row: 0, col: 14,  rank: 0, type: 'normal', label: 'Broken Chains', connectsTo: [], effects: { xp: -4, rb: +1 } },
        { id: 'forged', tier: 5, icon: 'icons/forged.png', row: 0, col: 15,  rank: 0, type: 'normal', label: 'Forged', connectsTo: [], effects: { xp: -3, hp: +1 } },
        { id: 'memory_rub', tier: 5, icon: 'icons/memory_rub.png', row: 0, col: 16,  rank: 0, type: 'normal', label: 'Memory Rub', connectsTo: [] },
         { id: 'force_storm', tier: 5, icon: 'icons/force_storm.png', row: 0, col: 17,  rank: 0, type: 'normal', label: 'Force Storm', connectsTo: [] },
          { id: 'force_maelstrom', tier: 5, icon: 'icons/force_maelstrom.png', row: 0, col: 18,  rank: 0, type: 'normal', label: 'Force Maelstrom', connectsTo: [], effects: { rb: +1 } },
            { id: 'death_field', tier: 5, icon: 'icons/death_field.png', row: 0, col: 19,  rank: 0, type: 'normal', label: 'Death Field', connectsTo: [] },
        // TIER 4 - Lord & Commander

        { id: 'strategic_leadership', tier: 4, icon: 'icons/strategic_leadership.png',  row: 2, col: 2,  rank: 0, type: 'rb', label: 'Strategic Leadership', connectsTo: [], effects: { xp: -4, rb: +1 }, description: 'This skill represents a character’s ability to make assessments of a situation and coordinate a team of subordinates clearly and effectively. ' },
        { id: 'psychological_warfare', tier: 4, icon: 'icons/psychological_warfare.png', row: 2, col: 11,  rank: 0, type: 'rb', label: 'Psychological Warfare', connectsTo: ['authority'] , description: 'This skill represents a character’s ability to intimidate, coerce and confuse others on a large scale, demoralising or changing the beliefs of entire target populations, such as through the use of propaganda.'},
        
        { id: 'force_repulse', tier: 4, icon: 'icons/force_repulse.jpg',  row: 1, col: 14,  rank: 0, type: 'rb', label: 'Force Repulse', connectsTo: ['force_maelstrom'] },
        { id: 'force_burst', tier: 4, icon: 'icons/force_burst.png', row: 2, col: 14, rank: 0, type: 'rb', label: 'Force Burst', connectsTo: ['force_repulse'] },
        { id: 'force_whirlwind', tier: 4, icon: 'icons/force_whirlwind.png',  row: 1, col: 15,  rank: 0, type: 'rb', label: 'Force Whirlwind', connectsTo: [] },
        { id: 'force_crush', tier: 4, icon: 'icons/force_crush.png', row: 2, col: 15, rank: 0, type: 'rb', label: 'Force Crush', connectsTo: [] },
        { id: 'aura_of_uneasiness', tier: 4, icon: 'icons/aura_of_uneasiness.png',  row: 1, col: 16,  rank: 0, type: 'rb', label: 'Aura of Uneasiness', connectsTo: [] },
        { id: 'force_cloak', tier: 4, icon: 'icons/force_cloak.png', row: 2, col: 16, rank: 0, type: 'rb', label: 'Force Cloak', connectsTo: [] },
        { id: 'chain_lightning', tier: 4, icon: 'icons/chain_lightning.png',  row: 1, col: 17,  rank: 0, type: 'rb', label: 'Chain Lightning', connectsTo: ['force_storm'] },
        { id: 'force_tempest', tier: 4, icon: 'icons/force_tempest.png', row: 2, col: 17, rank: 0, type: 'rb', label: 'Force Tempest', connectsTo: ['chain_lightning'] },
        
        { id: 'force_bubble', tier: 4, icon: 'icons/force_bubble.webp',  row: 1, col: 18,  rank: 0, type: 'hp', label: 'Force Bubble', connectsTo: ['force_maelstrom'] },
        { id: 'dominate_mind', tier: 4, icon: 'icons/dominate_mind.png', row: 2, col: 18, rank: 0, type: 'rb', label: 'Dominate Mind', connectsTo: [] },
        { id: 'dark_healing', tier: 4, icon: 'icons/dark_healing.webp',  row: 1, col: 18,  rank: 0, type: 'hp', label: 'Dark Healing', connectsTo: ['force_maelstrom'] },
        { id: 'drain_life', tier: 4, icon: 'icons/drain_life.png', row: 2, col: 18, rank: 0, type: 'rb', label: 'Drain Life', connectsTo: ['dark_healing','death_field'] },
        // TIER 3 - Officer Corps

        { id: 'tactics', tier: 3, icon: 'icons/tactics.png', row: 3, col: 2,  rank: 0, type: 'rb', label: 'Tactics', connectsTo: ['stategic_leadership'] },
        { id: 'electronets', tier: 3, icon: 'icons/electronets.webp', row: 3, col: 3,  rank: 0, type: 'rb', label: 'Electronets', connectsTo: [] },
        { id: 'marine_engineering', tier: 3, icon: 'icons/marine_engineering.webp', row: 3, col: 6,  rank: 0, type: 'rb', label: 'Marine Engineering', connectsTo: ['annihilation'] },
        { id: 'remote_control', tier: 3, icon: 'icons/remote_control.webp', row: 3, col: 7,  rank: 0, type: 'rb', label: 'Remote Control', connectsTo: [], description: 'This skill represents a character’s ability to access and control technological systems, such as that of droids or security networks remotely. ' },
        { id: 'surgery', tier: 3, icon: 'icons/surgery.webp', row: 3, col: 8,  rank: 0, type: 'rb', label: 'Surgery', connectsTo: ['bioengineering'] },
        { id: 'poisons', tier: 3, icon: 'icons/poisons.png', row: 3, col: 9,  rank: 0, type: 'rb', label: 'Poisons & Toxins', connectsTo: ['bioengineering'], description: 'This skill represents a character’s ability to formulate, handle and utilise poisonous and toxic substances safely to themselves and their allies inside and out of combat. This may also include the knowledge of how to counter, treat or cure the ill-effects of such substances.' },
       { id: 'sorcery', tier: 3, icon: 'icons/sith_sorcery.png', row: 3, col: 14,  rank: 0, type: 'rb', label: 'Sorcery', connectsTo: [] },
         { id: 'alchemy', tier: 3, icon: 'icons/sith_alchemy.png', row: 3, col: 19,  rank: 0, type: 'rb', label: 'Alchemy', connectsTo: [] },
        // TIER 2 - Advanced Training
      
        { id: 'shield', tier: 2, icon: 'icons/shield.webp', rank: 0, type: 'rb', row: 5, col: 0,  label: 'Shield', connectsTo: [], effects: { xp: -3, hp: +1 } },
        { id: 'darts', tier: 2, icon: 'icons/darts.webp', rank: 0, type: 'rb', row: 5, col: 1,  label: 'Darts', connectsTo: [], description: 'This skill represents a character’s ability to accurately use darts of various types against others or avoid them. ' },
        { id: 'initiative', tier: 2, icon: 'icons/initiative.png', rank: 0, type: 'rb', row: 5, col: 2,  label: 'Initiative', connectsTo: [] , description: 'This skill represents a character’s ability to both react quickly in response to the surrounding environment and situation. It also provides a bonus when determining the order of actions of different characters.'},
        { id: 'demolition', tier: 2, icon: 'icons/demolition.webp', rank: 0, type: 'rb', row: 5, col: 3,  label: 'Demolition', connectsTo: [] },
        { id: 'disarm', tier: 2, icon: 'icons/disarm.webp', rank: 0, type: 'rb', row: 5, col: 4,  label: 'Disarm', connectsTo: [] },
        { id: 'infiltration', tier: 2, icon: 'icons/infiltration.webp', rank: 0, type: 'rb', row: 5, col: 5,  label: 'Infiltration', connectsTo: [] , description: 'This skill represents a character’s ability to conceal their own motivations and intentions, whilst taking actions to covertly carry out actions that serve these goals without drawing notice to themselves. '},
        { id: 'gunnery', tier: 2, icon: 'icons/gunnery.webp', rank: 0, type: 'rb', row: 5, col: 6,  label: 'Gunnery', connectsTo: ['marine_engineering'] },
        { id: 'comms_warfare', tier: 2, icon: 'icons/comms_warfare.webp', rank: 0, type: 'rb', row: 5, col: 7,  label: 'Comms Warfare', connectsTo: ['remote_control'] },
        { id: 'stabilizing_care', tier: 2, icon: 'icons/stabilizing_care.png', rank: 0, type: 'rb', row: 5, col: 8,  label: 'Stabilizing Care', connectsTo: ['surgery'], description: 'This skill represents a character’s ability to stabilise others who are in a degrading and critical condition, such as through resuscitation, defibrillation, administration of life-saving drugs or treatments that prevent the individual from dying.' },
         { id: 'chemistry', tier: 2, icon: 'icons/chemistry.png', rank: 0, type: 'rb', row: 5, col: 9,  label: 'Chemistry', connectsTo: ['poisons'] },
         { id: 'perception', tier: 2, icon: 'icons/perception.png', rank: 0, type: 'rb', row: 5, col: 10,  label: 'Perception', connectsTo: [], description: 'aka Insight: this skill represents a character’s ability to read the body language and expressions of others to gain insight into their motivations, intentions and honesty. It also aids in investigations and detecting details in the environment, helping to learn more about surroundings and the environment itself.' },
          { id: 'manipulation', tier: 2, icon: 'icons/manipulation.webp', rank: 0, type: 'rb', row: 5, col: 11,  label: 'Manipulation', connectsTo: ['psychological_warfare'] },
         { id: 'offense', tier: 2, icon: 'icons/offense.png', rank: 0, type: 'rb', row: 5, col: 14,  label: 'Offense', connectsTo: [] },
          { id: 'force_scream', tier: 2, icon: 'icons/force_scream.png', rank: 0, type: 'rb', row: 5, col: 15,  label: 'Force Scream', connectsTo: [] },
          { id: 'force_empathy', tier: 2, icon: 'icons/force_empathy.webp', rank: 0, type: 'rb', row: 5, col: 16,  label: 'Force Empathy', connectsTo: [] },
          { id: 'force_lightning', tier: 2, icon: 'icons/force_lightning.png', rank: 0, type: 'rb', row: 5, col: 17,  label: 'Force Lightning', connectsTo: ['force_tempest'] },
          { id: 'force_deflect', tier: 2, icon: 'icons/force_lightning.png', rank: 0, type: 'rb', row: 5, col: 18,  label: 'Force Deflect', connectsTo: ['force_bubble'] },
           { id: 'force_slow', tier: 2, icon: 'icons/force_slow.webp', rank: 0, type: 'rb', row: 5, col: 19,  label: 'Force Slow', connectsTo: ['force_stun'] },


             { id: 'defense', tier: 2, icon: 'icons/defense.webp', rank: 0, type: 'rb', row: 4, col: 14,  label: 'Defense', connectsTo: [] },
            { id: 'force_grip', tier: 2, icon: 'icons/force_grip.webp', rank: 0, type: 'rb', row: 4, col: 15,  label: 'Force Grip', connectsTo: ['force_choke'] },
             { id: 'force_stealth', tier: 2, icon: 'icons/force_stealth.png', rank: 0, type: 'rb', row: 4, col: 16,  label: 'Force Stealth', connectsTo: ['false_ls_aura'] },
              { id: 'alter_environment', tier: 2, icon: 'icons/alter_environment.webp', rank: 0, type: 'rb', row: 4, col: 17,  label: 'Alter Environment', connectsTo: ['pyrokinesis'] },
           { id: 'force_illusion', tier: 2, icon: 'icons/force_illusion.png', rank: 0, type: 'rb', row: 4, col: 18,  label: 'Force Illusion', connectsTo: ['mind_trick'] },
        { id: 'force_stun', tier: 2, icon: 'icons/force_stun.webp', rank: 0, type: 'rb', row: 4, col: 19,  label: 'Force Stun', connectsTo: [] },

             { id: 'maneuver', tier: 2, icon: 'icons/maneuver.webp', rank: 0, type: 'rb', row: 3, col: 14,  label: 'Maneuver', connectsTo: [] },
            { id: 'force_choke', tier: 2, icon: 'icons/force_choke.png', rank: 0, type: 'rb', row: 3, col: 15,  label: 'Force Choke', connectsTo: ['force_crush'] },
             { id: 'false_ls_aura', tier: 2, icon: 'icons/false_ls_aura.webp', rank: 0, type: 'rb', row: 3, col: 16,  label: 'False LS Aura', connectsTo: ['force_cloak'] },
              { id: 'pyrokinesis', tier: 2, icon: 'icons/pyrokinesis.png', rank: 0, type: 'rb', row: 3, col: 17,  label: 'Pyrokinesis', connectsTo: ['pyrokinesis'] },
           { id: 'mind_trick', tier: 2, icon: 'icons/mind_trick.png', rank: 0, type: 'rb', row: 3, col: 18,  label: 'Mind Trick', connectsTo: ['dominate_mind'] },
        { id: 'drain_force', tier: 2, icon: 'icons/drain_force.png', rank: 0, type: 'rb', row: 3, col: 19,  label: 'Drain Force', connectsTo: ['drain_life'] },


        // TIER 1 - Basic Training
        { id: 'agility', tier: 1, icon: 'icons/agility.webp', row:7, col: 0, rank: 0, type: 'hp', label: 'Agility', connectsTo: [], description: 'This skill represents a character’s ability to evade harm, such as falling obstacles, as well as carry out more acrobatic feats such as climbing walls or jumping gaps.' },
         { id: 'strength', tier: 1, icon: 'icons/strength.webp', row:8, rank: 0, col: 0, type: 'normal', label: 'Strength', connectsTo: [], description: 'This skill represents a character’s ability to exert themselves physically, such as the lifting and moving of heavy objects.' },
        { id: 'blasters', tier: 1, icon: 'icons/blasters.webp', row:7, col: 1, rank: 0, type: 'hp', label: 'Blasters', connectsTo: [] },
        { id: 'armor', tier: 1, icon: 'icons/armor.webp', row:8, col: 1, rank: 0, type: 'hp', label: 'Armor', connectsTo: [], effects: { xp: -3, hp: +1 } },
         { id: 'cover', tier: 1, icon: 'icons/cover.webp', row:7, col: 2, rank: 0, type: 'hp', label: 'Cover', connectsTo: [] },
        { id: 'aim', tier: 1, icon: 'icons/aim.png', row:8, col: 2, rank: 0, type: 'hp', label: 'Aim', connectsTo: [], description: 'This skill represents a character’s ability to strike a target accurately and reliably , such as with a blaster bolt.' },
         { id: 'explosives', tier: 1, icon: 'icons/explosives.webp', row:7, col: 3, rank: 0, type: 'hp', label: 'Explosives', connectsTo: ['demolition'] },
        { id: 'jetpack', tier: 1, icon: 'icons/jetpack.webp', row:8, col: 3, rank: 0, type: 'hp', label: 'Jetpack', connectsTo: [] },
         { id: 'blades', tier: 1, icon: 'icons/blades.webp', row:7, col: 4, rank: 0, type: 'hp', label: 'Blades', connectsTo: [] },
        { id: 'cq_combat', tier: 1, icon: 'icons/cq_combat.png', row:8, col: 4, rank: 0, type: 'hp', label: 'CQ Combat', connectsTo: [], description: 'This skill represents a character’s ability to fight in close quarters - utilising melee weaponry, martial technique and proprioception to land strikes and defend themselves.' },
        { id: 'stealth', tier: 1, icon: 'icons/stealth.png', row:7, col: 5, rank: 0, type: 'hp', label: 'Stealth', connectsTo: ['infiltration'] },
        { id: 'recon', tier: 1, icon: 'icons/recon.webp', row:8, col: 5, rank: 0, type: 'hp', label: 'Recon', connectsTo: [] , description: 'This skill represents a character’s ability to gather primary sources of information to inform tactical and mission command, such as through the use of probe droids or scouting. '},
         { id: 'piloting', tier: 1, icon: 'icons/piloting.webp', row:7, col: 6, rank: 0, type: 'hp', label: 'Piloting', connectsTo: ['gunnery'], description: 'This skill represents a character’s ability to operate heavy machinery, such as starships effectively and reliably. ' },
        { id: 'navigation', tier: 1, icon: 'icons/navigation.webp', row:8, col: 6, rank: 0, type: 'hp', label: 'Navigation', connectsTo: [], description: 'This skill represents a character’s ability to orient themselves in a physical space through various means, such as the use of maps, landscape, or other readouts. ' },
         { id: 'slicing', tier: 1, icon: 'icons/slicing.webp', row:7, col: 7, rank: 0, type: 'hp', label: 'Slicing', connectsTo: ['comms_warfare'], description: 'This skill represents a character’s ability to access a secure technological network to gain information covertly.' },
        { id: 'technology', tier: 1, icon: 'icons/technology.webp', row:8, col: 7, rank: 0, type: 'hp', label: 'Technology', connectsTo: [], description: 'This skill represents a character’s ability to use (and construct) various technological items, such as droids, communication arrays, security systems and other items. ' },
         { id: 'first_aid', tier: 1, icon: 'icons/first_aid.webp', row:7, col: 8, rank: 0, type: 'hp', label: 'First Aid', connectsTo: ['stabilizing_care'], description: 'This skill represents a character’s ability to perform the most basic checks and actions aimed at prolonging a character’s life in a critical situation, such as checking airways, the recovery position, the application and use of a tourniquet or medpack.' },
        { id: 'diagnostics', tier: 1, icon: 'icons/diagnostics.webp', row:8, col: 8, rank: 0, type: 'hp', label: 'Diagnostics', connectsTo: ['first_aid'], description: 'This skill represents a character’s ability to diagnose physical and mental ailments, either through the use of equipment such as bioscanners, or through inspection and professional knowledge.' },
        { id: 'biology', tier: 1, icon: 'icons/biology.webp', row:7, col: 9, rank: 0, type: 'hp', label: 'Biology', connectsTo: ['chemistry'], description: 'This skill represents a character’s ability to understand the function of living things, including topics such as genetics and microscopic study. Medical knowledge is excluded.'  },
       { id: 'cybernetics', tier: 1, icon: 'icons/cybernetics.png', row:8, rank: 0, col: 9, type: 'normal', label: 'Cybernetics', connectsTo: [], description: 'This skill represents a character’s ability to design and implement cybernetics into a living body. May also apply to the use of more complicated cybernetic functions. ' },
      
        { id: 'culture', tier: 1, icon: 'icons/culture.webp', row:7, col: 10, rank: 0, type: 'hp', label: 'Linguistics&History', connectsTo: ['diplomacy'], description: ' This skill represents a character’s ability to understand the norms and values of various cultures (inc. their own) as well as the character’s pre-existing knowledge of such. This can include: religious beliefs, cultural taboos, societal organisation and prejudices. The skill includes knowledge in History and Linguistics as well.' },
         { id: 'archeology', tier: 1, icon: 'icons/archeology.webp', row:8, col: 10, rank: 0, type: 'hp', label: 'Archeology', connectsTo: ['culture'], description: 'This skill represents a character’s ability to understand, remember and apply information about ancient civilisations. Such as by navigating tombs or identifying artefacts. ' },
         { id: 'diplomacy', tier: 1, icon: 'icons/diplomacy.png', row:7, col: 11, rank: 0, type: 'hp', label: 'Diplomacy', connectsTo: ['manipulation'], description:'This skill represents a character’s ability to negotiate with others using both reasoned arguments and a demeanour found to be appealing by the other party. ' },
       { id: 'persuasion', tier: 1, icon: 'icons/persuasion.webp', row:8, col: 11, rank: 0, type: 'hp', label: 'Persuasion', connectsTo: ['diplomacy'] , description: 'This skill represents a character’s ability to influence the actions of others through appeal and explanation. Such as through the application of rhetorical devices or evidence.'},
        
        { id: 'interrogation', tier: 1, icon: 'icons/interrogation.webp', row:8,  col: 12, rank: 0, type: 'normal', label: 'Interrogation', connectsTo: ['intimidation'], description: 'This skill represents a character’s ability to get information out of an unwilling subject through various means, such as chemical influences, threats or torture.' },
          { id: 'intimidation', tier: 1, icon: 'icons/intimidation.webp', rank: 0, row: 7, col: 12,  type: 'rb', label: 'Intimidation', connectsTo: ['manipulation'], description: 'This skill represents a character’s ability to frighten or otherwise coerce others via demeanor, threat, or deliberate actions. ' },
            { id: 'swords', tier: 1, icon: 'icons/swords.webp', row:7,  col: 14, rank: 0, type: 'normal', label: 'Swords', connectsTo: ['offense', 'defense', 'maneuver'] },
          { id: 'mechu_deru', tier: 1, icon: 'icons/mechu_deru.webp', rank: 0, row: 8, col: 14,  type: 'rb', label: 'Mechu-Deru', connectsTo: [] },
           { id: 'force_pull', tier: 1, icon: 'icons/force_pull.png', row:7,  col: 15, rank: 0, type: 'normal', label: 'Force Pull', connectsTo: [] },
          { id: 'force_push', tier: 1, icon: 'icons/force_push.webp', rank: 0, row: 8, col: 15,  type: 'rb', label: 'Force Push', connectsTo: ['force_whirlwind'] },
         { id: 'force_sense', tier: 1, icon: 'icons/force_sense.png', row:7,  col: 16, rank: 0, type: 'normal', label: 'Force Sense', connectsTo: ['force_empathy', 'alter_environment'] },
          { id: 'force_sight', tier: 1, icon: 'icons/force_sight.webp', rank: 0, row: 8, col: 16,  type: 'rb', label: 'Force Sight', connectsTo: [''] },
            { id: 'force_shock', tier: 1, icon: 'icons/force_shock.webp', row:7,  col: 17, rank: 0, type: 'normal', label: 'Force Shock', connectsTo: ['force_lightning'] },
          { id: 'telepathy', tier: 1, icon: 'icons/telepathy.png', rank: 0, row: 8, col: 17,  type: 'rb', label: 'Telepathy', connectsTo: [''] },
              { id: 'force_barrier', tier: 1, icon: 'icons/force_barrier.png', row:7,  col: 18, rank: 0, type: 'normal', label: 'Force Barrier', connectsTo: ['force_deflect'] },
          { id: 'control_pain', tier: 1, icon: 'icons/control_pain.png', rank: 0, row: 8, col: 18,  type: 'rb', label: 'Control Pain', connectsTo: [''] },
                 { id: 'force_speed', tier: 1, icon: 'icons/force_speed.webp', row:7,  col: 19, rank: 0, type: 'normal', label: 'Force Speed', connectsTo: [] },
          { id: 'augmentation', tier: 1, icon: 'icons/augmentation.png', rank: 0, row: 8, col: 19,  type: 'rb', label: 'Augmentation', connectsTo: [''], effects: { xp: -3, hp: +1 } },

    ]
};

// DOM References
const elements = {
    workspace: document.getElementById('skillWorkspace'),
    skillsLayer: document.getElementById('skillsLayer'),
    connectionsSvg: document.getElementById('connectionsSvg'),
    xpVerticalFill: document.getElementById('xpVerticalFill'),
    xpVerticalSpent: document.getElementById('xpVerticalSpent'),
    //currentRankFull: document.getElementById('currentRankFull'),
    hpBlocks: document.getElementById('hpBlocks'),
    rbBlocks: document.getElementById('rbBlocks'),
    rankingTiers: document.getElementById('rankingTiers'),
    charName: document.getElementById('charName'),
    charRank: document.getElementById('charRank'),
    charDesc: document.getElementById('charDesc'),
    //textSizeSlider: document.getElementById('textSizeSlider'),
    //sizeValue: document.getElementById('sizeValue')
};
    const RANKS  = {
        1: ['Initiate', 'Acolyte', 'Trooper', 'Specialist'],
        2: ['Sith Apprentice', 'Sith Neophyte', 'Sergeant', 'Ensign', 'Midshipman'],
        3: ['Sith Castellan', 'Lieutenant', 'Captain', 'Navy Commander'],
        4: ['Sith Lord', 'Major', 'Colonel', 'Navy Captain'],
        5: ['High Lord', 'Darth', 'Moff', 'Governor', 'General', 'Admiral']
    };
// Initialize
function init() {
    renderSkillTree();
    renderTierMarkers();
    renderSkillLegend();
    updateAll();
    bindEvents();
    state.lastTier = getCurrentTier();
}
function getMaxRank(skill) {
    if (skill.id === 'force_maelstrom') return 5;
    if(!skill.effects) return 5;
    if (skill.effects.hp) return 3;
    if (skill.effects.rb) return 4;
    return 5;
}
// Get current tier based on XP
function getCurrentTier() {
    const xp = state.totalXP;

    if (xp >= state.tiers[5].threshold) return 5;
    if (xp >= state.tiers[4].threshold) return 4;
    if (xp >= state.tiers[3].threshold) return 3;
    if (xp >= state.tiers[2].threshold) return 2;
    if (xp >= state.tiers[1].threshold) return 1;

    return 1;
}
function getMaxAllowedRank(skill) {
    const prerequisites = state.skills.filter(s =>
        s.connectsTo && s.connectsTo.includes(skill.id)
    );

    if (prerequisites.length === 0) return getMaxRank(skill);

    // Find strongest parent
    const bestParentRank = Math.max(...prerequisites.map(p => p.rank || 0));

    return Math.min(getMaxRank(skill), bestParentRank);
}
function renderTierMarkers() {
    const container = elements.rankingTiers;
    container.innerHTML = '';

    const tierLabels = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V'
    };

    Object.entries(state.tiers).forEach(([tier, data]) => {
        if (data.threshold === Infinity) return;

        const percent = (data.threshold / state.maxXP) * 100;

        const marker = document.createElement('div');
        marker.className = 'tier-divider';
        marker.dataset.tier = tier;

        marker.style.bottom = `${percent}%`;

        marker.innerHTML = `
            <span class="tier-label">${tierLabels[tier]}</span>
        `;

        container.appendChild(marker);
    });
}
// Get rank name
function getCurrentRankName() {
    const tier = getCurrentTier();
    const ranks = {
        1: ['Initiate', 'Acolyte', 'Trooper', 'Specialist'],
        2: ['Sith Apprentice', 'Sith Neophyte', 'Sergeant', 'Ensign', 'Midshipman'],
        3: ['Sith Castellan', 'Lieutenant', 'Captain', 'Navy Commander'],
        4: ['Sith Lord', 'Major', 'Colonel', 'Navy Captain'],
        5: ['High Lord', 'Darth', 'Moff', 'Governor', 'General', 'Admiral']
    };
    
    const tierRanks = ranks[tier];
            const prevThresholds = {
            1: 0,
            2: state.tiers[1].threshold,
            3: state.tiers[2].threshold,
            4: state.tiers[3].threshold,
            5: state.tiers[4].threshold
        };

        const tierThresholds = {
            1: state.tiers[2].threshold,
            2: state.tiers[3].threshold,
            3: state.tiers[4].threshold,
            4: state.tiers[5].threshold === Infinity ? state.maxXP : state.tiers[5].threshold,
            5: state.maxXP
        };
    
    const xpInTier = state.totalXP - prevThresholds[tier];
    const tierRange = tierThresholds[tier] - prevThresholds[tier];
    const rankIndex = Math.min(
        Math.floor((xpInTier / tierRange) * tierRanks.length),
        tierRanks.length - 1
    );
    
    return `TIER ${tier}:| XP: ${state.spentXP}/${state.totalXP}`;
}

// Check if skill is available based on connections
function isSkillAvailable(skill) {
    const prerequisites = state.skills.filter(s => s.connectsTo && s.connectsTo.includes(skill.id));
    
    if (prerequisites.length === 0) return true;
    
    return prerequisites.some(prereq => prereq.rank > 0);
}

// Render the skill tree with 18-column grid
function renderSkillTree() {
    elements.skillsLayer.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'skill-tree';

    const tierOrder = [5, 4, 3, 2, 1];

    tierOrder.forEach(tier => {

        const tierContainer = document.createElement('div');
        tierContainer.className = `tier-container tier-${tier}`;

        // HEADER (this replaces overlay tiers)
        const header = document.createElement('div');
        header.className = 'tier-header';
        const ranksForTier = RANKS[tier] || [];

    header.innerHTML = `
        <div class="tier-title">TIER ${tier}</div>
        <div class="tier-ranks">${ranksForTier.join(' • ')}</div>
`;

        const rowsWrapper = document.createElement('div');
        rowsWrapper.className = 'tier-rows';

        const tierSkills = state.skills.filter(s => s.tier === tier);
        
        const rows = {};
        tierSkills.forEach(skill => {
            if (!rows[skill.row]) rows[skill.row] = [];
            rows[skill.row].push(skill);
        });

        Object.keys(rows)
            .map(Number)
            .sort((a, b) => a - b)
            .forEach(rowIndex => {

                const rowEl = document.createElement('div');
                rowEl.className = 'skill-row';

                const grid = document.createElement('div');
                grid.className = 'skill-grid-row';

                const TOTAL_COLS = 20;
                grid.style.gridTemplateColumns = `repeat(${TOTAL_COLS}, var(--skill-size))`;

                for (let col = 0; col < TOTAL_COLS; col++) {
                    const cell = document.createElement('div');

                    const skill = rows[rowIndex].find(s => s.col === col);
                    if (skill) {
                        
                        cell.appendChild(createSkillNode(skill));
                    }

                    grid.appendChild(cell);
                }

                rowEl.appendChild(grid);
                rowsWrapper.appendChild(rowEl);
            });

        tierContainer.appendChild(header);
        tierContainer.appendChild(rowsWrapper);
        container.appendChild(tierContainer);
    });

    elements.skillsLayer.appendChild(container);

    highlightActiveTierSection();
    setTimeout(drawConnections, 100);
}

// Create skill node with click cycling
function createSkillNode(skill) {
    const tooltip = document.getElementById('skillTooltip');
    const node = document.createElement('div');
    node.className = 'skill-node';
    node.setAttribute('data-skill-id', skill.id);
    
    // Level colors
    const levelColors = {
        0: { border: '#555', shadow: '0 0 5px rgba(0,0,0,0.5)' },
        1: { border: '#ffffff', shadow: '0 0 12px #ffffff' },
        2: { border: '#3fff00', shadow: '0 0 14px #3fff00' },
        3: { border: '#1e90ff', shadow: '0 0 16px #1e90ff' },
        4: { border: '#ffd700', shadow: '0 0 18px #ffd700' },
        5: { border: '#bf00ff', shadow: '0 0 22px #bf00ff' }
    };
    
    // Apply current level styling
    const currentLevel = skill.rank || 0;
    if (levelColors[currentLevel]) {
        node.style.borderColor = levelColors[currentLevel].border;
        node.style.borderWidth = currentLevel > 0 ? '3px' : '2px';
        node.style.boxShadow = levelColors[currentLevel].shadow;
        if (currentLevel === 5) {
            node.style.animation = 'pulse-glow 2s ease-in-out infinite';
        }
    }
    
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        node.style.opacity = '0.4';
        node.style.filter = 'grayscale(80%)';
    }
    
    const img = document.createElement('img');
    img.src = skill.icon;
    img.alt = skill.label; 
    node.appendChild(img);

    if (skill.effects) {
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'skill-effects';

    Object.entries(skill.effects).forEach(([key, value]) => {
        const badge = document.createElement('div');
        badge.className = `effect effect-${key}`;

        const sign = value > 0 ? '+' : '';
        badge.textContent = `${sign}${value}${key.toUpperCase()}`;

        effectsContainer.appendChild(badge);
    });

    node.appendChild(effectsContainer);
}
    
    const label = document.createElement('div');
    label.className = 'skill-label';
    updateSkillLabel(label, skill);
    node.appendChild(label);
    
    // Store label reference for updates
    node._skillLabel = label;
    node._skill = skill;
    
    // LEFT CLICK: Cycle up through levels
    node.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        
      
        
        cycleSkillUp(skill, node);
    };
    
    // RIGHT CLICK: Cycle down through levels
    node.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
      
        
        cycleSkillDown(skill, node);
    };
node.onmouseenter = () => {
    if (!skill.description) return;

    tooltip.classList.remove('hidden');

    tooltip.innerHTML = `
        <img src="${skill.icon}">
        <div class="title">${skill.label}</div>
        <div class="desc">${skill.description}</div>
    `;
 
};

node.onmousemove = (e) => {
    tooltip.style.left = (e.pageX + 85) + 'px';
    tooltip.style.top = (e.pageY -130) + 'px';
};

node.onmouseleave = () => {
    tooltip.classList.add('hidden');
};
    return node;
}

// Separate function to handle skill click
function handleSkillClick(skill) {
    console.log('handleSkillClick:', skill.label);
    
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        alert('This skill requires a prerequisite! Learn the connected skill first.');
        return;
    }
    
    if (getCurrentTier() < skill.tier) {
        alert('You need to be Tier ' + skill.tier + ' to upgrade this skill!');
        return;
    }
    
    const maxRank = getMaxRank(skill);
    
    if (skill.rank >= maxRank) {
        alert('Maximum rank reached! (Level 5)');
        return;
    }
    
    const availableXP = state.totalXP - state.spentXP;
    console.log('Available XP:', availableXP);
    
    if (availableXP <= 0) {
        alert('No XP available! Gain more XP first.');
        return;
    }
    
    // Calculate costs to each level
    const levelCosts = [];
    const levelNames = ['Level 1 (White)', 'Level 2 (Green)', 'Level 3 (Blue)', 'Level 4 (Gold)', 'Level 5 (Purple)'];
    
    let cumulativeCost = 0;
    const maxAllowed = getMaxAllowedRank(skill);

    for (let i = skill.rank + 1; i <= maxRank; i++) {
    if (i > maxAllowed) break;
        if (i <= 4) {
            cumulativeCost += i;
        } else if (i === 5) {
            cumulativeCost += 6;
        }
        levelCosts.push({
            level: i,
            cost: cumulativeCost,
            name: levelNames[i - 1]
        });
    }
    
    let message = 'Upgrade "' + skill.label + '" (Current: Level ' + (skill.rank || 0) + ')\n\n';
    message += 'Available XP: ' + availableXP + '\n\n';
    message += 'Choose level:\n';
    
    for (let i = 0; i < levelCosts.length; i++) {
        const lc = levelCosts[i];
        const canAfford = availableXP >= lc.cost ? 'YES' : 'NO';
        message += (i + 1) + '. ' + lc.name + ' - Cost: ' + lc.cost + ' XP [' + canAfford + ']\n';
    }
    message += '\nEnter number (1-' + levelCosts.length + '):';
    
    const choice = prompt(message, '1');
    console.log('Choice:', choice);
    
    if (!choice) return;
    
    const selectedIndex = parseInt(choice) - 1;
    
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= levelCosts.length) {
        alert('Invalid selection! Enter a number between 1 and ' + levelCosts.length);
        return;
    }
    
    const selectedLevel = levelCosts[selectedIndex];
    
    if (availableXP < selectedLevel.cost) {
        alert('Not enough XP! Need ' + selectedLevel.cost + ' XP but only have ' + availableXP + ' XP available.');
        return;
    }
    
    console.log('Upgrading to level:', selectedLevel.level, 'cost:', selectedLevel.cost);
    saveHistory();
    skill.rank = selectedLevel.level;
    recalculateXP();
    updateAll();
}

// Update skill label text and color
function updateSkillLabel(label, skill) {
    const levelColors = {
        0: '#ffffff',
        1: '#ffffff',
        2: '#3fff00',
        3: '#1e90ff',
        4: '#ffd700',
        5: '#bf00ff'
    };
    
    const currentLevel = skill.rank || 0;
    label.textContent = skill.label;
    label.style.color = levelColors[currentLevel] || '#ffffff';
}

// Cycle skill up one level
function cycleSkillUp(skill, node) {
    const maxRank = getMaxRank(skill);
    const maxAllowed = getMaxAllowedRank(skill);

   

    if (skill.rank >= maxRank) {
        // Already max, cycle back to 0
        cycleSkillToLevel(skill, node, 0);
        return;
    }
    
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        alert('This skill requires a prerequisite! Learn the connected skill first.');
        return;
    }
    
    if (getCurrentTier() < skill.tier) {
        alert('You need to be Tier ' + skill.tier + ' to upgrade this skill!');
        return;
    }
    
    const nextLevel = skill.rank + 1;
    const cost = getLevelCost(skill, skill.rank, nextLevel);
    const availableXP = state.totalXP - state.spentXP;
     if (nextLevel > maxAllowed) {
        alert(`You must first upgrade the connected skill(s) to level ${nextLevel}.`);
        return;
    }
    if (availableXP < cost) {
        alert('Not enough XP! Need ' + cost + ' XP but only have ' + availableXP + ' XP available.');
        return;
    }
    
    cycleSkillToLevel(skill, node, nextLevel);
}

// Cycle skill down one level
function cycleSkillDown(skill, node) {
    if (skill.rank <= 0) {
        // Already at 0, cycle to max
        const maxRank = getMaxRank(skill);
        const totalCost = getTotalCostToMax(skill);
        const availableXP = state.totalXP - state.spentXP;
        
        if (availableXP < totalCost) {
            alert('Not enough XP to go to max! Need ' + totalCost + ' XP.');
            return;
        }
        
        if (!isSkillAvailable(skill)) {
            alert('This skill requires a prerequisite!');
            return;
        }
        
        cycleSkillToLevel(skill, node, maxRank);
        return;
    }
    
    const prevLevel = skill.rank - 1;
    cycleSkillToLevel(skill, node, prevLevel);
}

// Set skill to specific level
function cycleSkillToLevel(skill, node, targetLevel) {
    if (skill.rank === targetLevel) return;

    saveHistory();
    skill.rank = targetLevel;

    recalculateXP();
    updateNodeVisuals(skill, node);
    updateAll();
}
 
// Get XP cost to go from one level to another
function getLevelCost(skill, fromLevel, toLevel) {
    if (toLevel <= fromLevel) return 0;

    let cost = 0;

    // normal rank progression cost
    for (let i = fromLevel + 1; i <= toLevel; i++) {
        if (i <= 4) cost += 1;
        else if (i === 5) cost += 2;
    }
 
    return cost;
}
// Get total cost to go from 0 to max
function getTotalCostToMax(skill) {
    return getLevelCost(skill, 0, 5);
}

// Update node visuals after level change
function updateNodeVisuals(skill, node) {
    const levelColors = {
        0: { border: '#555', shadow: '0 0 5px rgba(0,0,0,0.5)', width: '2px' },
        1: { border: '#ffffff', shadow: '0 0 12px #ffffff', width: '3px' },
        2: { border: '#3fff00', shadow: '0 0 14px #3fff00', width: '3px' },
        3: { border: '#1e90ff', shadow: '0 0 16px #1e90ff', width: '3px' },
        4: { border: '#ffd700', shadow: '0 0 18px #ffd700', width: '3px' },
        5: { border: '#bf00ff', shadow: '0 0 22px #bf00ff', width: '3px' }
    };
    
    const level = skill.rank || 0;
    const colors = levelColors[level];
    
    node.style.borderColor = colors.border;
    node.style.borderWidth = colors.width;
    node.style.boxShadow = colors.shadow;
    
    if (level === 5) {
        node.style.animation = 'pulse-glow 2s ease-in-out infinite';
    } else {
        node.style.animation = '';
    }
    
    // Update locked state
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        node.style.opacity = '0.4';
        node.style.filter = 'grayscale(80%)';
    } else {
        node.style.opacity = '1';
        node.style.filter = '';
    }
    
    // Update label
    if (node._skillLabel) {
        updateSkillLabel(node._skillLabel, skill);
    }
}

// Draw connections
function drawConnections() {
    const svg = elements.connectionsSvg;
    svg.innerHTML = '';
    
    const workspaceRect = elements.workspace.getBoundingClientRect();
    
    state.skills.forEach(skill => {
        if (skill.connectsTo && skill.connectsTo.length > 0) {
            const sourceEl = document.querySelector(`[data-skill-id="${skill.id}"]`);
            if (!sourceEl) return;
            
            skill.connectsTo.forEach(targetId => {
                const targetEl = document.querySelector(`[data-skill-id="${targetId}"]`);
                if (!targetEl) return;
                
                const sourceRect = sourceEl.getBoundingClientRect();
                const targetRect = targetEl.getBoundingClientRect();
                
                const x1 = sourceRect.left + sourceRect.width / 2 - workspaceRect.left + elements.workspace.scrollLeft;
                const y1 = sourceRect.top + sourceRect.height / 2 - workspaceRect.top + elements.workspace.scrollTop;
                const x2 = targetRect.left + targetRect.width / 2 - workspaceRect.left + elements.workspace.scrollLeft;
                const y2 = targetRect.top + targetRect.height / 2 - workspaceRect.top + elements.workspace.scrollTop;
                
                let path;
                
                if (Math.abs(x1 - x2) < 10) {
                    path = `M ${x1} ${y1} L ${x2} ${y2}`;
                } else if (Math.abs(y1 - y2) < 10) {
                    path = `M ${x1} ${y1} L ${x2} ${y2}`;
                } else {
                    const midY = (y1 + y2) / 2;
                    path = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
                }
                
                const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathEl.setAttribute('d', path);
                pathEl.setAttribute('fill', 'none');
                pathEl.setAttribute('stroke', 'rgba(255, 215, 0, 0.4)');
                pathEl.setAttribute('stroke-width', '2');
                pathEl.setAttribute('stroke-dasharray', '5, 4');
                
                const targetSkill = state.skills.find(s => s.id === targetId);
                if (skill.rank > 0 && targetSkill && targetSkill.rank > 0) {
                    pathEl.setAttribute('stroke', '#ffd700');
                    pathEl.setAttribute('stroke-width', '2.5');
                    pathEl.setAttribute('stroke-dasharray', 'none');
                    pathEl.setAttribute('filter', 'drop-shadow(0 0 4px #ffd700)');
                }
                
                svg.appendChild(pathEl);
            });
        }
    });
}

// Rank up skill with level selection dialog
function rankUpSkill(skill) {
    console.log('rankUpSkill called for:', skill.id, 'Current rank:', skill.rank);
    
    
    
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        alert('This skill requires a prerequisite!');
        return;
    }
    
    if (getCurrentTier() < skill.tier) {
        alert(`You need to be Tier ${skill.tier} to upgrade this skill!`);
        return;
    }
    
    const maxRank = getMaxRank(skill);
    
    if (skill.rank >= maxRank) {
        alert('Maximum rank reached!');
        return;
    }
    
    // Calculate available XP
    const availableXP = state.totalXP - state.spentXP;
    console.log('Available XP:', availableXP);
    
    // Calculate cost to reach each level from current rank
    const levelCosts = [];
    const levelNames = ['Level 1 (White)', 'Level 2 (Green)', 'Level 3 (Blue)', 'Level 4 (Gold)', 'Level 5 (Purple)'];
    
    let cumulativeCost = 0;
    for (let i = skill.rank + 1; i <= maxRank; i++) {
        if (i <= 4) {
            cumulativeCost += 1;
        } else if (i === 5) {
            cumulativeCost += 2;
        }
        levelCosts.push({
            level: i,
            cost: cumulativeCost,
            name: levelNames[i - 1]
        });
    }
    
    // Build dialog message
    let message = `Upgrade "${skill.label}" (Current: Level ${skill.rank || 0})\n\n`;
    message += `Available XP: ${availableXP}\n\n`;
    message += 'Choose level:\n';
    
    levelCosts.forEach((lc, index) => {
        const canAfford = availableXP >= lc.cost ? '✓' : '✗';
        message += `${index + 1}. ${lc.name} - Cost: ${lc.cost} XP ${canAfford}\n`;
    });
    message += '\nEnter number (1-' + levelCosts.length + '):';
    
    const choice = prompt(message, '1');
    console.log('User choice:', choice);
    
    if (!choice) return;
    
    const selectedIndex = parseInt(choice) - 1;
    
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= levelCosts.length) {
        alert('Invalid selection');
        return;
    }
    
    const selectedLevel = levelCosts[selectedIndex];
    
    if (availableXP < selectedLevel.cost) {
        alert(`Not enough XP! Need ${selectedLevel.cost} XP but only have ${availableXP} XP available.`);
        return;
    }
    
    console.log('Upgrading to level:', selectedLevel.level);
    saveHistory();
    skill.rank = selectedLevel.level;
    recalculateXP();
    updateAll();
}
// Skill context menu
function showSkillMenu(skill) {
    const action = prompt(
        `Edit "${skill.label}" (Tier ${skill.tier})\n\n` +
        'Options: type | icon | label',
        'type'
    );
    
    if (!action) return;
    
    switch(action.toLowerCase()) {
        case 'type':
            const newType = prompt('Skill type (normal/hp/rb):', skill.type);
            if (newType && ['normal', 'hp', 'rb'].includes(newType)) {
                saveHistory();
                skill.type = newType;
                const maxRank = getMaxRank(skill);
                if (skill.rank > maxRank) skill.rank = maxRank;
                updateAll();
            }
            break;
            
        case 'icon':
            const newIcon = prompt('Icon path:', skill.icon);
            if (newIcon) {
                saveHistory();
                skill.icon = newIcon;
                updateAll();
            }
            break;
            
        case 'label':
            const newLabel = prompt('Skill label:', skill.label);
            if (newLabel) {
                saveHistory();
                skill.label = newLabel;
                updateAll();
            }
            break;
    }
}

// Recalculate spent XP
function recalculateXP() {
    let spent = 0;

    state.skills.forEach(skill => {
        const rank = skill.rank || 0;

         
        // CASE 2: normal skills -> rank cost system
        for (let i = 1; i <= rank; i++) {
            if (i <= 4) spent += 1;
            else spent += 2;
        }

         
    });

    state.spentXP = spent;
}

// Update all displays
function updateAll() {
    const prevTier = state.lastTier;
    const newTier = getCurrentTier();

    recalculateXP();
    updateXPDisplay();
    updateRankDisplay();
    updateStats();

    // Detect tier unlock
    if (newTier > prevTier) {
        onTierUnlocked(newTier);
    }

    state.lastTier = newTier;

    document.querySelectorAll('.skill-node').forEach(node => {
        const skill = state.skills.find(s => s.id === node.dataset.skillId);
        if (skill) updateNodeVisuals(skill, node);
    });

    drawConnections();
}

function onTierUnlocked(tier) {
    // Highlight the whole tier section
    const tierSection = document.querySelector(`.tier-${tier}`);
    if (tierSection) {
        tierSection.classList.add('tier-unlock-highlight');

        setTimeout(() => {
            tierSection.classList.remove('tier-unlock-highlight');
        }, 2000);
    }

    // OPTIONAL: highlight all skills in that tier
    document.querySelectorAll(`.tier-${tier} .skill-node`).forEach(node => {
        node.classList.add('skill-unlock-flash');

        setTimeout(() => {
            node.classList.remove('skill-unlock-flash');
        }, 1500);
    });
}
// Update vertical XP bar
function updateXPDisplay() {
    const xpValue = document.getElementById('xpValueDisplay');

    if (xpValue) {
        xpValue.textContent = `${state.spentXP} / ${state.totalXP} XP`;
    }

    // TOTAL XP (progress bar)
    const totalPercent = Math.round(((state.totalXP+1) / state.maxXP) * 100);

    if (elements.xpVerticalFill) {
        elements.xpVerticalFill.style.height = `${totalPercent}%`;
    }

    // SPENT XP (overlay inside total)
    const spentPercent = (state.spentXP / state.maxXP) * 100;

    if (elements.xpVerticalSpent) {
        elements.xpVerticalSpent.style.height = `${spentPercent}%`;
    }
}
function addXP(amount) {
    saveHistory();
    state.totalXP = Math.min(state.maxXP, state.totalXP + amount);
    updateAll();
}

function removeXP(amount) {
    saveHistory();
    state.totalXP = Math.max(0, state.totalXP - amount);

    // clamp spent XP
    state.spentXP = Math.min(state.spentXP, state.totalXP);

    updateAll();
}
function normalizeSkillsToXP() {
    // flatten skills if XP no longer supports them
    const flatSkills = state.skills
        .sort((a, b) => b.rank - a.rank);

    let available = state.totalXP;

    state.spentXP = 0;

    flatSkills.forEach(skill => {
        let rank = skill.rank;

        while (rank > 0) {
            const cost = getLevelCost(skill, rank - 1, rank);

            if (available >= cost) {
                available -= cost;
                state.spentXP += cost;
                break;
            } else {
                rank--;
            }
        }

        skill.rank = rank;
    });
}
// Update ranking display
function updateRankDisplay() {
    const currentTier = getCurrentTier();
    
    const tierDividers = elements.rankingTiers.querySelectorAll('.tier-divider');
    tierDividers.forEach(divider => {
        divider.classList.remove('active');
        if (parseInt(divider.dataset.tier) === currentTier) {
            divider.classList.add('active');
        }
    });
}

// Highlight active tier section
function highlightActiveTierSection() {
    const currentTier = getCurrentTier();

    document.querySelectorAll('.skill-row').forEach(row => {
        const tier = parseInt(row.dataset.tier);

        if (tier === currentTier) {
            row.classList.add('active-tier-row');
        } else {
            row.classList.remove('active-tier-row');
        }
    });
}

// Update HP and RB stats
function updateStats() {
    let hpTotal = 0;
    let rbTotal = 0;

    state.skills.forEach(skill => {
        if (!skill.effects) return;

        const rank = skill.rank || 0;

        if (skill.effects.hp && skill.rank >= 3) {
            hpTotal += 1;
        }

        if (skill.effects.rb) {
            if (skill.id === 'force_maelstrom') {
                if (skill.rank >= 5) rbTotal += 1;
            } else {
                if (skill.rank >= 4) rbTotal += 1;
            }
        }
    });

    // Base HP (you had 2 before)
    const baseHP = 3;
    renderVerticalBlocks(
        document.getElementById('hpVerticalBlocks'),
        baseHP + hpTotal,
        10,
        'hp'
    );

    renderVerticalBlocks(
        document.getElementById('rbVerticalBlocks'),
        rbTotal,
        10,
        'rb'
    );
    renderStatBlocks(elements.hpBlocks, baseHP + hpTotal, 10, 'hp');
    renderStatBlocks(elements.rbBlocks, rbTotal, 10, 'rb');
}
function renderVerticalBlocks(container, filled, max, type) {
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < max; i++) {
        const block = document.createElement('div');
        block.className = `stat-block ${type}-block`;

        if (i < filled) {
            block.classList.add('filled');
        }

        container.appendChild(block);
    }
}
// Render stat blocks
function renderStatBlocks(container, filled, max, type) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < max; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        block.classList.add(i < filled ? `${type}-filled` : 'empty');
        container.appendChild(block);
    }
}

// Update label sizes
/*function updateLabelSizes() {
    const size = elements.textSizeSlider.value + 'px';
    document.querySelectorAll('.skill-label').forEach(label => {
        label.style.fontSize = size;
    });
    if (elements.sizeValue) {
        elements.sizeValue.textContent = size;
    }
}*/

 

// History management
function saveHistory() {
    state.history.push({
        totalXP: state.totalXP,
        spentXP: state.spentXP,
        skills: JSON.parse(JSON.stringify(state.skills))
    });
}

function undo() {
    if (state.history.length === 0) return;
    
    const lastState = state.history.pop();
    state.totalXP = lastState.totalXP;
    state.spentXP = lastState.spentXP;
    state.skills = lastState.skills;
    
    updateAll();
}

// Gain XP
function gainXP(amount) {
    if (state.totalXP >= state.maxXP) {
        alert('Maximum XP reached!');
        return;
    }
    
    saveHistory();
    state.totalXP = Math.min(state.maxXP, state.totalXP + amount);
    updateAll();
}

// Save profile
function saveProfile() {
    const profileData = {
        version: '5.0',
        state: {
            totalXP: state.totalXP,
            spentXP: state.spentXP,
            isLocked: state.isLocked
        },
        character: {
            name: elements.charName.value,
            description: elements.charDesc.value,
            rank:elements.charRank.value,
            portrait: document.getElementById('charPortrait').src
        },
        skills: state.skills.map(skill => ({
            id: skill.id,
            rank: skill.rank,
            type: skill.type
        }))
    };
    
    const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profileData.character.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
function loadProfile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // -------------------
            // STATE RESTORE
            // -------------------
            state.totalXP = data.state?.totalXP ?? 0;
            state.spentXP = data.state?.spentXP ?? 0;
            state.isLocked = data.state?.isLocked ?? false;

            // -------------------
            // CHARACTER DATA
            // -------------------
            if (data.character?.name) {
                elements.charName.value = data.character.name;
                document.getElementById('charNameFull').textContent = data.character.name;
            }
            if (data.character?.portrait) {
                document.getElementById('charPortrait').src = data.character.portrait;
            }
            if (data.character?.description) {
                document.getElementById('charDesc').textContent = data.character.description;
            }
            if (data.character?.rank) {
                document.getElementById('charRank').value = data.character.rank;
            }
            // -------------------
            // SKILLS RESTORE
            // -------------------
            state.skills.forEach(skill => {
                const saved = data.skills?.find(s => s.id === skill.id);
                if (saved) {
                    skill.rank = saved.rank ?? 0;
                    if (saved.type) skill.type = saved.type;
                } else {
                    skill.rank = 0;
                }
            });

            // -------------------
            // FULL REBUILD (IMPORTANT)
            // -------------------
            recalculateXP();
            updateAll();
            renderSkillTree();
            drawConnections();

        } catch (err) {
            console.error(err);
            alert("Invalid or corrupted profile file.");
        }
    };

    reader.readAsText(file);
}
// Load portrait
function loadPortrait(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('charPortrait').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Redraw connections on scroll
window.addEventListener('resize', () => {
    drawConnections();
});

// Bind events
function bindEvents() {
    //document.getElementById('lockToggle').addEventListener('click', toggleLock);
    document.getElementById('gainXpBtn').addEventListener('click', () => addXP(1));
    document.getElementById('gain5XpBtn').addEventListener('click', () => addXP(5));
    document.getElementById('gain10XpBtn').addEventListener('click', () => addXP(10));

    document.getElementById('loseXpBtn').addEventListener('click', () => removeXP(1));
    document.getElementById('lose5XpBtn').addEventListener('click', () => removeXP(5));
    document.getElementById('lose10XpBtn').addEventListener('click', () => removeXP(10));
    document.getElementById('saveBtn').addEventListener('click', saveProfile);
   // document.getElementById('undoBtn').addEventListener('click', undo);

    document.getElementById('loadBtn').addEventListener('click', () => {
    document.getElementById('loadInput').click();
        });
document.getElementById('loadInput').addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        loadProfile(e.target.files[0]);
    }
 
});
    
   // elements.textSizeSlider.addEventListener('input', updateLabelSizes);
    
    if (elements.skillsLayer) {
        elements.skillsLayer.addEventListener('scroll', () => drawConnections());
    }
    
   document.getElementById('portraitUpload').addEventListener('change', (e) => {
    loadPortrait(e.target);
});
 
}
function renderSkillLegend() {
    const container = document.getElementById('skillLegend');
    if (!container) return;

    const levels = [
        { level: 'I', color: '#ffffff'},
        { level: 'II', color: '#3fff00' },
        { level: 'III', color: '#1e90ff'},
        { level: 'IV', color: '#ffd700' },
        { level: 'V', color: '#bf00ff' }
    ];

    container.innerHTML = '';

    levels.forEach(lvl => {
        const row = document.createElement('div');
        row.className = 'legend-row';

        row.innerHTML = `
            <div class="legend-box" style="border-color:${lvl.color}"></div>
            <span> — LEVEL ${lvl.level}</span>
        `;

        container.appendChild(row);
    });
}
document.getElementById("downloadPngBtn").addEventListener("click", async () => {

    const original = document.querySelector(".app-container");
    const topUI = document.querySelector(".top-ui");

    // Hide UI
    topUI.style.display = "none";

    // Clone entire layout
    const clone = original.cloneNode(true);

    // Put clone off-screen
    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.width = original.scrollWidth + "px";
    clone.style.height = "auto";
    clone.style.overflow = "visible";

    document.body.appendChild(clone);

    // 🚨 IMPORTANT: disable scrolling inside clone
    const skillsLayer = clone.querySelector(".skills-layer");
    skillsLayer.style.overflow = "visible";
    skillsLayer.style.height = "auto";
    skillsLayer.style.maxHeight = "none";

    // Also force tiers to expand fully
    clone.querySelectorAll(".tier-container").forEach(el => {
        el.style.height = "auto";
    });

    await new Promise(r => requestAnimationFrame(r));

    html2canvas(clone, {
        backgroundColor: "#06080c",
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {

        const link = document.createElement("a");
        link.download = "swtor-character.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        // cleanup
        document.body.removeChild(clone);
        topUI.style.display = "flex";
    });
});
// Initialize
document.addEventListener('DOMContentLoaded', init);