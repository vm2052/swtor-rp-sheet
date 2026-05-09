// ============================================
// SWTOR RP - Connected Skill Tree Logic
// ============================================

const state = {
    isLocked: false,
    totalXP: 7,
    spentXP: 0,
    maxXP: 125,
    history: [],
    lastTier: 1,
    customSkill: null, // stores the created skill
    customChoice: null,
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
       
        { id: 'annihilation', tier: 5, icon: 'icons/annihilation.webp', row: 0, col: 6,  rank: 0, type: 'normal', label: 'Annihilation', connectsTo: [], effects: { xp: -4, rb: +1 } , description: 'This skill represents a character’s ability to authorize and gain clearance to order the annihilation of a populace or planet through, such as via orbital bombardment.'},
        { id: 'bioengineering', tier: 5, icon: 'icons/bioengineering.webp', row: 0, col: 8,  rank: 0, type: 'normal', label: 'BioEngineering', connectsTo: [], effects: { xp: -4, rb: +1 }, description: 'This skill represents a character’s ability to safely create ways to interact with, and edit a living creature’s biology, such as the use of genetic modification, design of sensor equipment and growing of creatures and organs.' },
        { id: 'authority', tier: 5, icon: 'icons/authority.webp', row: 0, col: 11,  rank: 0, type: 'normal', label: 'Authority', connectsTo: [] , effects: { xp: -4, rb: +1 }, description: 'This skill represents a character’s ability to utilise their actual or perceived status to influence and direct the actions of others. Such as through the issuing of orders. '},
        { id: 'broken_chains', tier: 5, icon: 'icons/broken_chains.png', row: 0, col: 14,  rank: 0, type: 'normal', label: 'Broken Chains', connectsTo: [], effects: { xp: -4, rb: +1 } , description: ' To cast aside the weak bonds of peace, compassion, and doubt is to embrace the true path of power. This state is achieved by severing all ties to the past, rejecting external dogma, and growing stronger from every perceived failing. By breaking these chains, the Sith gains absolute freedom and unparalleled strength, becoming a force unbound by the limitations of lesser beings.'},
        { id: 'forged', tier: 5, icon: 'icons/forged.png', row: 0, col: 15,  rank: 0, type: 'normal', label: 'Forged', connectsTo: [], effects: { xp: -4, hp: +1 }, description: 'Hardened by immense suffering and countless trials, this state represents a spirit tempered into unyielding resilience. Like metal forged in fire, the user becomes incredibly difficult to break, their strength forged from every obstacle endured.' },
        { id: 'memory_rub', tier: 5, icon: 'icons/memory_rub.png', row: 0, col: 16,  rank: 0, type: 'normal', label: 'Memory Rub', connectsTo: [] , description: 'Memory rubbing is a Force technique that allows an individual to use the Force to alter or erase the memories or even learned skills of another.'},
         { id: 'force_storm', tier: 5, icon: 'icons/force_storm.png', row: 0, col: 17,  rank: 0, type: 'normal', label: 'Force Storm', connectsTo: [], description: 'The user would raise their palm upward and would create, through the Force, an explosion of electrical energy directed at all foes in the vicinity. It also appeared as a tornado of energy which created a great disturbance in the Force.' },
          { id: 'force_maelstrom', tier: 5, icon: 'icons/force_maelstrom.png', row: 0, col: 18,  rank: 0, type: 'normal', label: 'Force Maelstrom', connectsTo: [], effects: { rb: +1 }, description: ' Force Maelstrom is a devastating combination of other powerful abilities. Firstly, the user forms a bubble around their body, concealing and protecting them inside. Then, any loose objects/persons around the user swirl around inside the bubble, through telekinesis. Finally, the user devastates the objects by blasting them away with a shock wave of energy accompanied by a surge of Force Lightning.' },
            { id: 'death_field', tier: 5, icon: 'icons/death_field.png', row: 0, col: 19, gain:'3HP',  rank: 0, type: 'normal', label: 'Death Field', connectsTo: [], description: 'A force user with this power can leech the life force from anyone in an area surrounding the force user, using it to heal himself. '},
        // TIER 4 - Lord & Commander

        { id: 'stategic_leadership', tier: 4, icon: 'icons/strategic_leadership.png',  row: 2, col: 2,  rank: 0, type: 'rb', label: 'Strategic Leadership', connectsTo: [], effects: { xp: -4, rb: +1 }, description: 'This skill represents a character’s ability to assess a given situation, set long-term objectives, and effectively coordinate subordinates to achieve them. It encompasses planning, resource allocation, and maintaining team morale, ensuring a clear direction towards ultimate victory.' },
        { id: 'psychological_warfare', tier: 4, icon: 'icons/psychological_warfare.png', row: 2, col: 11,  rank: 0, type: 'rb', label: 'Psychological Warfare', connectsTo: ['authority'] , description: 'This skill represents a character’s ability to intimidate, coerce and confuse others on a large scale, demoralising or changing the beliefs of entire target populations, such as through the use of propaganda.'},
         { id: 'resilience', tier: 4, icon: 'icons/resilience.webp', row: 2, col: 0,  rank: 0, type: 'normal', label: 'Resilience', connectsTo: [], effects: { xp: -4, hp: +1 },description: 'This skill represents a character’s physical and mental tenacity, such as the ability to endure or shrug off injuries as well as mental effects that harm.' },
        { id: 'force_repulse', tier: 4, icon: 'icons/force_repulse.jpg',  row: 1, col: 14,  rank: 0, type: 'rb', label: 'Force Repulse', connectsTo: ['force_maelstrom'], description : ' Force Repulse was no more or less than a gigantic telekinetic spherical explosion. The user concentrates on the Force and violently pushes it outwards, creating rapidly-expanding kinetic ripples in space, flinging nearby objects away at high velocity. The power only affected objects a certain distance away from the user, and therefore can be avoided by moving further away from the user. Minor variant – Force Wave.' },
        { id: 'force_burst', tier: 4, icon: 'icons/force_burst.png', row: 2, col: 14, rank: 0, type: 'rb', label: 'Force Burst', connectsTo: ['force_repulse'] , description: ' Force Burst is as the name suggest a condensed and concentrated burst of force power. It sought out it’s intended target and while it’s power depended on the user the result was quite destructive. Minor variant – Force Blast.'},
        { id: 'force_whirlwind', tier: 4, icon: 'icons/force_whirlwind.png',  row: 1, col: 15,  rank: 0, type: 'rb', label: 'Force Whirlwind', connectsTo: [] , description: 'A more advanced form of Force Push, the user would alter the air currents around an opponent, turning it into a maelstrom. This swirling force would lift an opponent into the air, spin them around, and leave them incapable of moving out of it.'},
        { id: 'force_crush', tier: 4, icon: 'icons/force_crush.png', row: 2, col: 15, rank: 0, type: 'rb', label: 'Force Crush', connectsTo: [] , description:'One of the most violent Force abilities, this deadly technique lifted the opponent into the air and as they were floating, their body would implode as it was crushed by the Force.'},
        { id: 'aura_of_uneasiness', tier: 4, icon: 'icons/aura_of_uneasiness.png',  row: 1, col: 16,  rank: 0, type: 'rb', label: 'Aura of Uneasiness', connectsTo: [] , description: 'This power primarily affects non-sentient animals, but with enough training and focus can affect even sentient beings. It instills a subconscious desire to not be near the force user or to outright flee from what they perceive as a great threat.'},
        { id: 'force_cloak', tier: 4, icon: 'icons/force_cloak.png', row: 2, col: 16, rank: 0, type: 'rb', label: 'Force Cloak', connectsTo: [], description: ' Force cloak, also known as Force camouflage, was a Force talent involving the manipulation of light and sound waves to render a practitioner virtually invisible to the naked eye.' },
        { id: 'chain_lightning', tier: 4, icon: 'icons/chain_lightning.png',  row: 1, col: 17,  rank: 0, type: 'rb', label: 'Chain Lightning', connectsTo: ['force_storm', 'force_maelstrom'], description : 'A variant of Force Lightning, performed as a burst of lightning that would spread from the first target to those around them. Sometimes this power was unleashed in a wave of stunning sparks.' },
        { id: 'force_tempest', tier: 4, icon: 'icons/force_tempest.png', row: 2, col: 17, rank: 0, type: 'rb', label: 'Force Tempest', connectsTo: ['chain_lightning'] , description :'Force Tempest was a variant in which the user could project Force lightning from all of their limbs in a whirlwind that encircled their body. It could be used to inflict damage to multiple adversaries.'},
        
        { id: 'force_bubble', tier: 4, icon: 'icons/force_bubble.webp',  row: 1, col: 18,  rank: 0, type: 'hp', label: 'Force Bubble', connectsTo: ['force_maelstrom'] , description: 'With this ability, the user can create a defensive sphere around their body that looks like a shimmering blue globe of energy. It can protect the user from a wide range of attacks, deflect laser blasts, defend against lightsabers, vacuums and even inflict certain amounts of damage upon contact with the enemy. Protection bubbles can also be used offensively: should the user surround the attacker in a bubble, it is possible the attacker will become a victim of their own attack, having been trapped within its destructive radius. This ability is difficult to sustain and requires the user to be completely stationary.'},
        { id: 'dominate_mind', tier: 4, icon: 'icons/dominate_mind.png', row: 2, col: 18, rank: 0, type: 'rb', label: 'Dominate Mind', connectsTo: [], description: 'This power allows to dominate the thoughts and emotions of the victim.' },
        { id: 'dark_healing', tier: 4, icon: 'icons/dark_healing.png',  row: 1, col: 19,  rank: 0, type: 'hp', gain:'2HP', label: 'Dark Healing', connectsTo: [] , description: 'A force user with this power can close the wounds on someone else by drawing on the force users or third parties life force.'},
        { id: 'drain_life', tier: 4, icon: 'icons/drain_life.png', row: 2, col: 19, rank: 0, type: 'rb', label: 'Drain Life', gain: '1HP', connectsTo: ['dark_healing','death_field'] , description: 'This insidious Force power allows a dark side user to siphon the vital energy from living organisms within their vicinity. By channeling the dark side, the user creates a conduit, drawing the life essence of their targets into themselves, which can then be used to heal wounds, replenish their own strength, or simply inflict excruciating suffering and death upon their victims.'},
        // TIER 3 - Officer Corps

        { id: 'tactics', tier: 3, icon: 'icons/tactics.png', row: 3, col: 2,  rank: 0, type: 'rb', label: 'Tactics', connectsTo: ['stategic_leadership'] , description:'This skill represents a character’s ability to accurately and efficiently read a battlefield to ascertain the ideal course of action. This includes identifying weaknesses in enemy lines, predicting opponent’s next moves, planning evasive maneuvers or attacks, and capitalizing on immediate opportunities to gain tactical advantage'}, 
        
        { id: 'marine_engineering', tier: 3, icon: 'icons/marine_engineering.webp', row: 3, col: 6,  rank: 0, type: 'rb', label: 'Marine Engineering', connectsTo: ['annihilation'], description: 'This skill represents a character’s ability to identify different types of ships, efficiently repair, upgrade and maintain naval systems such as Flagships and Starfighters, ranging from their engines and hull integrity to auxiliary systems like weaponry.' },
        { id: 'remote_control', tier: 2, icon: 'icons/remote_control.webp', row: 4, col: 7,  rank: 0, type: 'rb', label: 'Remote Control', connectsTo: [], description: 'This skill represents a character’s ability to access and control technological systems, such as that of droids or security networks remotely. ' },
        { id: 'surgery', tier: 3, icon: 'icons/surgery.webp', row: 3, col: 8,  rank: 0, type: 'rb', label: 'Surgery', connectsTo: ['bioengineering'] , description: 'This skill represents a character’s ability to accurately and safely carry out intensive and invasive critical medical procedures through the alteration of tissue and other bodily structures.'},
        { id: 'poisons', tier: 3, icon: 'icons/poisons.png', row: 3, col: 9,  rank: 0, type: 'rb', label: 'Poisons & Toxins', connectsTo: ['bioengineering'], description: 'This skill represents a character’s ability to formulate, handle and utilise poisonous and toxic substances safely to themselves and their allies inside and out of combat. This may also include the knowledge of how to counter, treat or cure the ill-effects of such substances.' },
      { id: 'false_ls_aura', tier: 3, icon: 'icons/false_ls_aura.webp', rank: 0, type: 'rb', row: 3, col: 16,  label: 'False LS Aura', connectsTo: ['force_cloak'] , description: 'False Light Side Aura allows to cover a Sith’s dark side aura with one of light, usually in order to trick others. The user can only conjure an aura for their skill level: Apprentice-Padawan, Sith-Knight, Lord-Master. Anyone who is above their level may detect the user.'},
        // TIER 2 - Advanced Training
      
        { id: 'shield', tier: 2, icon: 'icons/shield.webp', rank: 0, type: 'rb', row: 5, col: 0,  label: 'Shield', connectsTo: [], effects: { xp: -3, hp: +1 } , description:'This skill represents a character’s ability to effectively and efficiently protect and cover themselves or others from attack with a mobile solution such as a shield generator, or physical shield eg. riot shields, and improvised shields. '},
        { id: 'darts', tier: 2, icon: 'icons/darts.webp', rank: 0, type: 'rb', row: 5, col: 1,  label: 'Darts', connectsTo: [], description: 'This skill represents a character’s ability to accurately use darts of various types against others or avoid them. ' },
        { id: 'initiative', tier: 2, icon: 'icons/initiative.png', rank: 0, type: 'rb', row: 5, col: 2,  label: 'Initiative', connectsTo: ['tactics'] , description: 'This skill represents a character’s ability to both react quickly in response to the surrounding environment and situation. It also provides a bonus when determining the order of actions of different characters.'},
        { id: 'demolition', tier: 2, icon: 'icons/demolition.webp', rank: 0, type: 'rb', row: 5, col: 3,  label: 'Demolition', connectsTo: [] , description: 'This skill represents a character’s ability to safely and effectively handle explosives, such as fixed explosives against infrastructure or large constructs. Demolition also covers the use of laid traps against enemy forces.'},
       { id: 'electronets', tier: 2, icon: 'icons/electronets.webp', row: 4, col: 3,  rank: 0, type: 'rb', label: 'Electronets', connectsTo: [] , description: 'This skill represents a character’s ability to effectively launch and utilise electronets against enemies or opponents, such as proper entanglement, grouping and precision against moving targets. '},
        { id: 'disarm', tier: 2, icon: 'icons/disarm.webp', rank: 0, type: 'rb', row: 5, col: 4,  label: 'Disarm', connectsTo: [] , description: ' This skill represents a character’s ability to efficiently and safely remove the weapon of an enemy or opponent. It can also represent the ability to non-lethally stop a combatant from taking action, such as through the injury of limbs.'},
        { id: 'infiltration', tier: 2, icon: 'icons/infiltration.webp', rank: 0, type: 'rb', row: 5, col: 5,  label: 'Infiltration', connectsTo: [] , description: 'This skill represents a character’s ability to conceal their own motivations and intentions, whilst taking actions to covertly carry out actions that serve these goals without drawing notice to themselves. '},
        { id: 'gunnery', tier: 2, icon: 'icons/gunnery.webp', rank: 0, type: 'rb', row: 5, col: 6,  label: 'Gunnery', connectsTo: ['marine_engineering'] , description: 'This skill represents a character’s ability to accurately and effectively fire turrets and gun systems that are part of larger machinery, such as weapon emplacements, starfighter turrets and other vehicle-mounted cannonry.'},
        { id: 'comms_warfare', tier: 2, icon: 'icons/comms_warfare.webp', rank: 0, type: 'rb', row: 5, col: 7,  label: 'Comms Warfare', connectsTo: ['remote_control'] , description:'This skill represents a character’s ability to effectively and efficiently disrupt, deny or degrade the use of enemy comm systems, gather intelligence on enemy forces and safeguard one’s own.'},
        { id: 'stabilizing_care', tier: 2, icon: 'icons/stabilizing_care.png', rank: 0, type: 'rb', row: 5, col: 8, gain:'2HP' ,label: 'Stabilizing Care', connectsTo: ['surgery'], description: 'This skill represents a character’s ability to stabilise others who are in a degrading and critical condition, such as through resuscitation, defibrillation, administration of life-saving drugs or treatments that prevent the individual from dying.' },
         { id: 'chemistry', tier: 2, icon: 'icons/chemistry.png', rank: 0, type: 'rb', row: 5, col: 9,  label: 'Chemistry', connectsTo: ['poisons'], description: 'This skill represents a character’s ability to identify different chemical elements, effectively synthesise medications, drugs, adrenals and stims that are safe for consumption and provide benefits to themselves and their allies.' },
         { id: 'perception', tier: 2, icon: 'icons/perception.png', rank: 0, type: 'rb', row: 5, col: 10,  label: 'Perception', connectsTo: [], description: 'aka Insight: this skill represents a character’s ability to read the body language and expressions of others to gain insight into their motivations, intentions and honesty. It also aids in investigations and detecting details in the environment, helping to learn more about surroundings and the environment itself.' },
          { id: 'manipulation', tier: 2, icon: 'icons/manipulation.webp', rank: 0, type: 'rb', row: 5, col: 11,  label: 'Manipulation', connectsTo: ['psychological_warfare'] , description: 'This skill represents a character’s ability to lie and deceive others to one’s own advantage. Such convincing the target of a point through the exploitation of weaknesses the character has prior awareness of.'},
         { id: 'offense', tier: 2, icon: 'icons/offense.png', rank: 0, type: 'rb', row: 5, col: 14,  label: 'Offense', connectsTo: [], description: 'This is the aggressive mastery of the lightsaber, focusing on overwhelming the opponent with a continuous, high-pressure assault. It involves powerful, precise strikes, effective offensive feints, and the ability to press your advantage relentlessly, aiming to disrupt your opponent’s defenses and secure a decisive blow.' },
          { id: 'force_scream', tier: 2, icon: 'icons/force_scream.png', rank: 0, type: 'rb', row: 5, col: 15,  label: 'Force Scream', connectsTo: [], description: 'The force user is able to let out a shattering scream through the Force, venting all his hatred, pain and anguish in a primal scream. This skill also may include Voice Amplification.' },
          { id: 'force_empathy', tier: 2, icon: 'icons/force_empathy.webp', rank: 0, type: 'rb', row: 5, col: 16,  label: 'Force Empathy', connectsTo: [] , description: ' Force empathy is a Force power related to Force Sense, but involves picking up impressions of an individual’s feelings and general emotional state. Those Force-sensitives especially adept could pick up motivations, hidden feelings, and even deeply guarded secrets.'},
          { id: 'force_lightning', tier: 2, icon: 'icons/force_lightning.png', rank: 0, type: 'rb', row: 5, col: 17,  label: 'Force Lightning', connectsTo: ['force_tempest'] , description: 'Force lightning is a purely offensive, energy-based attack that channeled Force energy down the user’s limbs, hurling arcing bolts of electricity from the wielder’s fingertips or palms. Force lightning could be executed with either one or two hands. Powerful discharges would branch out into dozens of smaller forks; thus, skilled practitioners could target several foes at once.'},
          { id: 'force_deflect', tier: 2, icon: 'icons/force_deflect.jpg', rank: 0, type: 'rb', row: 5, col: 18,  label: 'Force Deflect', connectsTo: ['force_bubble'] , description: 'This includes a group of similar skills: Force Deflect (ability to deflect incoming attacks without lightsaber), Force Reflect (ability to reflect the projectile back), Negate Energy (negating effects of an energy based attack), Absorb Energy (ability to absorb energy), Dissipate Energy (ability to disperse an energy based projectile before it reaches the user).'},
           { id: 'force_slow', tier: 2, icon: 'icons/force_slow.webp', rank: 0, type: 'rb', row: 5, col: 19,  label: 'Force Slow', connectsTo: ['force_stun'] , description: 'This power clouds the target’s mind, causing them to slow down both mentally and physically.'},
        { id: 'sorcery', tier: 2, icon: 'icons/sith_sorcery.png', row:4, col: 16,  rank: 0, type: 'rb', label: 'Sorcery', connectsTo: [], description: 'Sith Sorcery encompasses the direct application of the dark side of the Force for offensive, defensive, and manipulative purposes. Practitioners channel dark side energy to unleash devastating attacks, bend the wills of others, weave powerful illusions, and create protective barriers. It is often called Sith Magic for creation and casting of complex spells forged in the raw dark side.' },
         { id: 'alchemy', tier: 2, icon: 'icons/sith_alchemy.png', row: 3, col: 19,  rank: 0, type: 'rb', label: 'Alchemy', connectsTo: [], description : ' This dark art involves the ritualistic manipulation of life and matter through the dark side of the Force. Sith Alchemists corrupt and reshape the very essence of living beings and inanimate objects, often resulting in the creation of horrific beasts, potent artifacts, and agonizing curses.' },

             { id: 'defense', tier: 2, icon: 'icons/defense.webp', rank: 0, type: 'rb', row: 4, col: 14,  label: 'Defense', connectsTo: [] , description: 'This skill set is dedicated to the precise deflection, redirection, and nullification of incoming lightsaber attacks and blaster fire. It emphasizes perfect timing, efficient parries, and the ability to weather an opponent’s assault, creating openings for counter-attacks or maintaining a strong defensive posture.'},
            { id: 'force_grip', tier: 2, icon: 'icons/force_grip.webp', rank: 0, type: 'rb', row: 4, col: 15,  label: 'Force Grip', connectsTo: ['force_choke'] , description: 'An often combative use of telekinesis, as it is used to grip a target, usually an enemy, with the Force. This technique is used either to restrain or immobilize its target, or, at a high enough degree, apply a harmful or damaging amount of pressure. This skill is also frequently used for throwing lightsaber towards the enemy and recalling it back.'},
             { id: 'force_stealth', tier: 2, icon: 'icons/force_stealth.png', rank: 0, type: 'rb', row: 3, col: 16,  label: 'Force Stealth', connectsTo: ['false_ls_aura'] , description: 'Force stealth, also referred to as Force Concealment or Buried Presence, is a power that was used by highly skilled Force-sensitives to mask their ability to use the Force, or even their entire presence from other Force-sensitives.'},
              { id: 'alter_environment', tier: 2, icon: 'icons/alter_environment.webp', rank: 0, type: 'rb', row: 4, col: 17,  label: 'Alter Environment', connectsTo: ['pyrokinesis'], description: ' Using this power someone can use the Force to manipulate temperatures, enabling the creation of wind or fog that could be used to attack or to shield the user from opponents. ' },
           { id: 'force_illusion', tier: 2, icon: 'icons/force_illusion.png', rank: 0, type: 'rb', row: 4, col: 18,  label: 'Force Illusion', connectsTo: ['mind_trick'], description: 'Force Illusion is a subset of the various mind trick powers. The user is able to project an image into the minds of beings within range, of anything from a pillar of fire to a horde of snarling monsters to a fleet of warships, depending on the range. The user could "see" the illusion as well, though it would be only partially there, semi-transparent like a hologram.' },
        { id: 'force_stun', tier: 2, icon: 'icons/force_stun.webp', rank: 0, type: 'rb', row: 4, col: 19,  label: 'Force Stun', connectsTo: [] , description :' Force Stun can temporarily deaden the senses and perceptions of a targeted enemy, preventing most movements.'},

             { id: 'maneuver', tier: 2, icon: 'icons/maneuver.webp', rank: 0, type: 'rb', row: 3, col: 14,  label: 'Maneuver', connectsTo: [], description: ' This ability focuses on agile and tactical movement during lightsaber combat. It involves evading attacks through strategic dodges and leaps, repositioning oneself for optimal attack angles, and using the environment to gain an advantage. Effective maneuver allows the user to control the engagement’s tempo and outwit their opponent through superior movement.' },
            { id: 'force_choke', tier: 2, icon: 'icons/force_choke.png', rank: 0, type: 'rb', row: 3, col: 15,  label: 'Force Choke', connectsTo: ['force_crush'], description: 'This was an attack via the Force that is used to crush a living being’s throat or trachea, in effect choking or strangling them if used at a low level, without physically touching them. With telekinetic grip on the victim’s neck, a user could potentially break their victim’s neck if enough pressure is applied.' },
         
              { id: 'pyrokinesis', tier: 2, icon: 'icons/pyrokinesis.png', rank: 0, type: 'rb', row: 3, col: 17,  label: 'Pyrokinesis', connectsTo: [], description: 'A force user with this power can generate fire from existing flammable materials by manipulating the molecules in the material.' },
           { id: 'mind_trick', tier: 2, icon: 'icons/mind_trick.png', rank: 0, type: 'rb', row: 3, col: 18,  label: 'Mind Trick', connectsTo: ['dominate_mind'] , description: 'Mind Trick allows to influence the thoughts of sentient creatures, often serving to resolve matters in a non-violent way, providing distraction or causing friendly fire among enemies. This skill includes such abilities as Force Confusion (temporarily manipulating enemies to fight as an ally), Force Subjugate (inflicting damage upon opponent’s mind and psyche) Force Fear (causing opponent to lose courage, demoralize with a feeling of hopelessness and regret) Force Horror (causing multiple enemies to enter into a catatonic state of panic). '},
        { id: 'drain_force', tier: 3, icon: 'icons/drain_force.png', rank: 0, type: 'rb', row: 3, col: 19,  label: 'Drain Force', connectsTo: ['drain_life'], description: 'Drain Force rekindles Force energy in the user, offensively draining the Force energy from those whom the power is turned upon.'},


        // TIER 1 - Basic Training
        { id: 'agility', tier: 1, icon: 'icons/agility.webp', row:7, col: 0, rank: 0, type: 'hp', label: 'Agility', connectsTo: [], description: 'This skill represents a character’s ability to evade harm, such as falling obstacles, as well as carry out more acrobatic feats such as climbing walls or jumping gaps.' },
         { id: 'strength', tier: 1, icon: 'icons/strength.webp', row:8, rank: 0, col: 0, type: 'normal', label: 'Strength', connectsTo: [], description: 'This skill represents a character’s ability to exert themselves physically, such as the lifting and moving of heavy objects.' },
        { id: 'blasters', tier: 1, icon: 'icons/blasters.webp', row:7, col: 1, rank: 0, type: 'hp', label: 'Blasters', connectsTo: [], description: 'This skill represents a character’s ability to accurately and efficiently handle blasters, such as blaster pistols, rifles and sniper rifles.'},
        { id: 'armor', tier: 1, icon: 'icons/armor.webp', row:8, col: 1, rank: 0, type: 'hp', label: 'Armor', connectsTo: [], effects: { xp: -4, hp: +1 } , description: 'This skill represents a character’s ability to comfortably and effectively utilise armour to both move and execute complex actions. It provides an additional layer of protection.'},
         { id: 'cover', tier: 1, icon: 'icons/cover.webp', row:7, col: 2, rank: 0, type: 'hp', label: 'Cover', connectsTo: [] , description: 'This skill represents a character’s ability to safely seek and use cover in combat scenarios, such as discerning suitable cover, and determining when to effectively counter-fire.'},
        { id: 'aim', tier: 1, icon: 'icons/aim.png', row:8, col: 2, rank: 0, type: 'hp', label: 'Aim', connectsTo: [], description: 'This skill represents a character’s innate or trained ability to precisely calculate and execute the trajectory for any object they project. Whether it’s flawlessly throwing a grappling hook to latch onto a distant ledge, accurately hurling a projectile to strike a specific point, or any other action demanding the precise understanding of distance.' },
         { id: 'explosives', tier: 1, icon: 'icons/explosives.webp', row:7, col: 3, rank: 0, type: 'hp', label: 'Explosives', connectsTo: ['demolition'], description: 'This skill represents a character’s ability to safely and effectively handle explosives for immediate use, such as grenades, fixed explosives, and thermal detonators against enemies or opponents.'},
        { id: 'jetpack', tier: 1, icon: 'icons/jetpack.webp', row:8, col: 3, rank: 0, type: 'hp', label: 'Jetpack', connectsTo: [] , description: 'This skill represents a character’s ability to safely and reliably utilise a jetpack, such as to traverse steep terrain, or gain an aerial advantage over targets.'},
         { id: 'blades', tier: 1, icon: 'icons/blades.webp', row:7, col: 4, rank: 0, type: 'hp', label: 'Blades', connectsTo: [], description: 'This skill represents a character’s ability to accurately and efficiently handle bladed objects such as knives, vibroswords and electroblades.' },
        { id: 'cq_combat', tier: 1, icon: 'icons/cq_combat.png', row:8, col: 4, rank: 0, type: 'hp', label: 'CQ Combat', connectsTo: [], description: 'This skill represents a character’s ability to fight in close quarters - utilising melee weaponry, martial technique and proprioception to land strikes and defend themselves.' },
        { id: 'stealth', tier: 1, icon: 'icons/stealth.png', row:7, col: 5, rank: 0, type: 'hp', label: 'Stealth', connectsTo: ['infiltration'] , description: 'This skill represents a character’s ability to evade detection through the minimisation of their physical presence by various means, such as the use of stealth generators and the strict use of silence.'},
        { id: 'recon', tier: 1, icon: 'icons/recon.webp', row:8, col: 5, rank: 0, type: 'hp', label: 'Recon', connectsTo: [] , description: 'This skill represents a character’s ability to gather primary sources of information to inform tactical and mission command, such as through the use of probe droids or scouting. '},
         { id: 'piloting', tier: 1, icon: 'icons/piloting.webp', row:7, col: 6, rank: 0, type: 'hp', label: 'Piloting', connectsTo: ['gunnery'], description: 'This skill represents a character’s ability to operate heavy machinery, such as starships effectively and reliably. ' },
        { id: 'navigation', tier: 1, icon: 'icons/navigation.webp', row:8, col: 6, rank: 0, type: 'hp', label: 'Navigation', connectsTo: [], description: 'This skill represents a character’s ability to orient themselves in a physical space through various means, such as the use of maps, landscape, or other readouts. ' },
         { id: 'slicing', tier: 1, icon: 'icons/slicing.webp', row:7, col: 7, rank: 0, type: 'hp', label: 'Slicing', connectsTo: ['comms_warfare'], description: 'This skill represents a character’s ability to access a secure technological network to gain information covertly.' },
        { id: 'technology', tier: 1, icon: 'icons/technology.webp', row:8, col: 7, rank: 0, type: 'hp', label: 'Technology', connectsTo: [], description: 'This skill represents a character’s ability to use (and construct) various technological items, such as droids, communication arrays, security systems and other items. ' },
         { id: 'first_aid', tier: 1, icon: 'icons/first_aid.webp', row:7, col: 8, rank: 0, type: 'hp', gain:'1HP', label: 'First Aid', connectsTo: ['stabilizing_care'], description: 'This skill represents a character’s ability to perform the most basic checks and actions aimed at prolonging a character’s life in a critical situation, such as checking airways, the recovery position, the application and use of a tourniquet or medpack.' },
        { id: 'diagnostics', tier: 1, icon: 'icons/diagnostics.webp', row:8, col: 8, rank: 0, type: 'hp', label: 'Diagnostics', connectsTo: ['first_aid'], description: 'This skill represents a character’s ability to diagnose physical and mental ailments, either through the use of equipment such as bioscanners, or through inspection and professional knowledge.' },
        { id: 'biology', tier: 1, icon: 'icons/biology.webp', row:7, col: 9, rank: 0, type: 'hp', label: 'Biology', connectsTo: ['chemistry'], description: 'This skill represents a character’s ability to understand the function of living things, including topics such as genetics and microscopic study. Medical knowledge is excluded.'  },
       { id: 'cybernetics', tier: 1, icon: 'icons/cybernetics.png', row:8, rank: 0, col: 9, type: 'normal', label: 'Cybernetics', connectsTo: [], description: 'This skill represents a character’s ability to understand, identify, and maintain cybernetic augmentations. It also covers the effective use of more complicated cybernetic functions.' },
      
        { id: 'culture', tier: 1, icon: 'icons/culture.webp', row:8, col: 10, rank: 0, type: 'hp', label: 'Culture', connectsTo: ['archeology', 'diplomacy'], description: ' aka Linguistics & History This skill represents a character’s ability to understand the norms and values of various cultures (inc. their own) as well as the character’s pre-existing knowledge of such. This can include: religious beliefs, cultural taboos, societal organisation and prejudices. The skill includes knowledge in History and Linguistics as well.' },
         { id: 'archeology', tier: 1, icon: 'icons/archeology.webp', row:7, col: 10, rank: 0, type: 'hp', label: 'Archeology', connectsTo: [], description: 'This skill represents a character’s ability to understand, remember and apply information about ancient civilisations. Such as by navigating tombs or identifying artefacts. ' },
         { id: 'diplomacy', tier: 1, icon: 'icons/diplomacy.png', row:7, col: 11, rank: 0, type: 'hp', label: 'Diplomacy', connectsTo: ['manipulation'], description:'This skill represents a character’s ability to negotiate with others using both reasoned arguments and a demeanour found to be appealing by the other party. ' },
       { id: 'persuasion', tier: 1, icon: 'icons/persuasion.webp', row:8, col: 11, rank: 0, type: 'hp', label: 'Persuasion', connectsTo: ['diplomacy'] , description: 'This skill represents a character’s ability to influence the actions of others through appeal and explanation. Such as through the application of rhetorical devices or evidence.'},
        
        { id: 'interrogation', tier: 1, icon: 'icons/interrogation.webp', row:8,  col: 12, rank: 0, type: 'normal', label: 'Interrogation', connectsTo: ['intimidation'], description: 'This skill represents a character’s ability to get information out of an unwilling subject through various means, such as chemical influences, threats or torture.' },
          { id: 'intimidation', tier: 1, icon: 'icons/intimidation.webp', rank: 0, row: 7, col: 12,  type: 'rb', label: 'Intimidation', connectsTo: ['manipulation'], description: 'This skill represents a character’s ability to frighten or otherwise coerce others via demeanor, threat, or deliberate actions. ' },
            { id: 'swords', tier: 1, icon: 'icons/swords.webp', row:7,  col: 13, rank: 0, type: 'normal', label: 'Swords', connectsTo: ['offense', 'defense', 'maneuver'] , description: 'This mastery covers swords and long bladed weapons—rapiers, vibroblades, pikes. (This skill may also include other melee weaponry).'},
       //   { id: 'mechu_deru', tier: 1, icon: 'icons/mechu_deru.webp', rank: 0, row: 8, col: 14,  type: 'rb', label: 'Mechu-Deru', connectsTo: [] },
           { id: 'force_pull', tier: 1, icon: 'icons/force_pull.png', row:7,  col: 15, rank: 0, type: 'normal', label: 'Force Pull', connectsTo: [], description: 'When using this force power the force user concentrates on gathering the force around an object or person and pull it toward themselves. Includes the classic calling of the lightsaber.' },
          { id: 'force_push', tier: 1, icon: 'icons/force_push.webp', rank: 0, row: 8, col: 15,  type: 'rb', label: 'Force Push', connectsTo: ['force_whirlwind', 'force_burst'] , description: 'When using this force power the force user concentrates on gathering the force within and shoots it out in a short burst toward an object or person, pushing them back.'},
         { id: 'force_sense', tier: 1, icon: 'icons/force_sense.png', row:7,  col: 16, rank: 0, type: 'normal', label: 'Force Sense', connectsTo: ['force_empathy', 'alter_environment'] , description: 'Force sense is among the most basic of Force abilities. It can be used to sense another being’s feelings, ripples in the Force caused by momentous or traumatic events, impending danger and even the future.'},
          { id: 'force_sight', tier: 1, icon: 'icons/force_sight.webp', rank: 0, row: 8, col: 16,  type: 'rb', label: 'Force Sight', connectsTo: [''], description: 'This power enhances a Force user’s visual and spatial perception, enabling them to see things not normally visible to the eyes and can even help negate mental tricks used on the force user. It allows to see in darkness, perceive auras and object alignment through solid barriers, detect subtle Force enhancements and spot cloaked opponents and subtle Force shifts, providing enhanced defenses against various Force-based mental and visual manipulations, including blindness effects.' },
            { id: 'force_shock', tier: 1, icon: 'icons/force_shock.webp', row:7,  col: 17, rank: 0, type: 'normal', label: 'Force Shock', connectsTo: ['force_lightning'], description: 'A minor variant of the Force Lightning ability. The ability creates a quick spark of electricity, expending all of the energy at once in order to disorient or stun a target rather than injure them.' },
          { id: 'telepathy', tier: 1, icon: 'icons/telepathy.png', rank: 0, row: 8, col: 17,  type: 'rb', label: 'Telepathy', connectsTo: [''], description: 'Telepathy was the very basic ability to read minds, mentally communicate and project the user’s thoughts over small or vast distances with other individuals. Acolytes may relay up to 5 word sentences over a very small distance.' },
              { id: 'force_barrier', tier: 1, icon: 'icons/force_barrier.png', row:7,  col: 18, rank: 0, type: 'normal', label: 'Force Barrier', connectsTo: ['force_deflect'] , description: ' Force Barrier is a very basic application of the Force. Depending on the force user, it manifests itself differently, appearing as a shimmering, stasis field of Force energy or sometimes not ‘appearing’ at all. In combat, these barriers are capable of absorbing a wide variety of physical and energy attacks. Depending on the strength of the individual, the barrier could usually only withstand a few attacks before collapsing.'},
          { id: 'control_pain', tier: 1, icon: 'icons/control_pain.png', rank: 0, row: 8, col: 18,  type: 'rb', label: 'Control Pain', connectsTo: [''], description: 'This power can be used to reduce the pain suffered from wounds. With training it might even be possible to reduce the pain in others or even shrug off effects that might incapacitate others.' },
                 { id: 'force_speed', tier: 1, icon: 'icons/force_speed.webp', row:7,  col: 19, rank: 0, type: 'normal', label: 'Force Speed', connectsTo: [], description: 'Force speed, also known as burst of speed or Force sprint, is a core Force power that allows the user to maintain sprinting speeds for a brief time. Greater aptitude grants greater boosts to speed and/or greater duration. The increased speed of the Force-user enables the individual to see the world and the entities around them in slow motion, allowing them to dodge attacks easily and attack more quickly with greater accuracy.' },
          { id: 'augmentation', tier: 1, icon: 'icons/augmentation.png', rank: 0, row: 8, col: 19,  type: 'rb', label: 'Augmentation', connectsTo: [''], effects: { xp: -4, hp: +1 }, description: 'A force user using Force Augmentation is able to shift their momentum, allowing them to perform feats of superhuman abilities like jumping from high places, running on walls or even ceilings, without harm.' },

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
    const customSkillEls = {
    icon: document.getElementById("customSkillIcon"),
    name: document.getElementById("customSkillName"),
    empty: document.getElementById("skillSlotEmpty"),
    filled: document.getElementById("skillSlotFilled")
};
// Initialize
function init() {
    renderSkillTree();
    renderTierMarkers();
    renderSkillLegend();
    updateAll();
    bindEvents();
    state.lastTier = getCurrentTier();
    skillSlotEmpty.style.display = "none";
    customChoiceStatus.style.display = "none";
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
            <span class="tier-xp">${data.threshold} XP</span>
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
    
    return `LEVEL ${tier}:| XP: ${state.spentXP}/${state.totalXP}`;
}
function canUpgradeSkill(skill) {

    // Already maxed
    if (skill.rank >= getMaxRank(skill)) {
        return false;
    }

    // Tier locked
    if (getCurrentTier() < skill.tier) {
        return false;
    }

    // Connection locked
    if (!isSkillAvailable(skill) && skill.rank === 0) {
        return false;
    }

    // Parent rank restriction
    const nextLevel = (skill.rank || 0) + 1;
    const maxAllowed = getMaxAllowedRank(skill);

    if (nextLevel > maxAllowed) {
        return false;
    }

    // XP restriction
    const cost = getLevelCost(skill, skill.rank || 0, nextLevel);
    const availableXP = state.totalXP - state.spentXP;

    if (availableXP < cost) {
        return false;
    }

    return true;
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

    const roman = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V'
    };

    tierOrder.forEach(tier => {

        const tierContainer = document.createElement('div');
        tierContainer.className = `tier-container tier-${tier}`;

        const header = document.createElement('div');
        header.className = 'tier-header';

        const ranksForTier = RANKS[tier] || [];

        header.innerHTML = `
            <div class="tier-title">LEVEL ${roman[tier]}</div>
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
    
   const canUpgrade = canUpgradeSkill(skill);

if (!canUpgrade && skill.rank === 0) {
    node.style.opacity = '0.35';
    node.style.filter = 'grayscale(85%) brightness(0.65)';
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
         ${skill.gain ? `
        <hr style="margin: 8px 0; border: none; border-top: 1px solid #444;">
        <div class="gain"><span style="color: #33ff99;">+${skill.gain}</span> to Target | once per scenario</div>
    ` : ''}
    `;
 
};
// In createSkillNode(), add these alongside the existing mouseenter/mouseleave for tooltips:

// In createSkillNode(), the mouseenter event:
node.addEventListener('mouseenter', () => {
    node.classList.add('active-hover-skill');
    
    if (skill.connectsTo && skill.connectsTo.length > 0) {
        skill.connectsTo.forEach(targetId => {
            const paths = document.querySelectorAll(
                `.connection-path[data-connection-source="${skill.id}"][data-connection-target="${targetId}"]`
            );
            paths.forEach(p => p.classList.add('highlighted-connection'));
            
            const targetNode = document.querySelector(`[data-skill-id="${targetId}"]`);
            if (targetNode) {
                targetNode.classList.add('connected-skill-highlight');
            }
        });
    }
    
    const incomingPaths = document.querySelectorAll(
        `.connection-path[data-connection-target="${skill.id}"]`
    );
    incomingPaths.forEach(p => {
        p.classList.add('highlighted-connection');
        
        const sourceId = p.getAttribute('data-connection-source');
        const sourceNode = document.querySelector(`[data-skill-id="${sourceId}"]`);
        if (sourceNode) {
            sourceNode.classList.add('connected-skill-highlight');
        }
    });
});

node.addEventListener('mouseleave', () => {
    node.classList.remove('active-hover-skill');
    
    document.querySelectorAll('.highlighted-connection').forEach(p => {
        p.classList.remove('highlighted-connection');
    });
    
    document.querySelectorAll('.connected-skill-highlight').forEach(n => {
        n.classList.remove('connected-skill-highlight');
    });
});
node.onmousemove = (e) => {
    const rect = tooltip.getBoundingClientRect();
    const padding = 20;

    let left = e.clientX + 85;
    let top = e.clientY - 130;

    // Right edge
    if (left + rect.width > window.innerWidth - padding) {
        left = e.clientX - rect.width - 30;
    }

    // Left edge
    if (left < padding) {
        left = padding;
    }

    // Bottom edge
    if (top + rect.height > window.innerHeight - padding) {
        top = e.clientY - rect.height - 30;
    }

    // Top edge
    if (top < padding) {
        top = padding;
    }

    tooltip.style.left = `${left + window.scrollX}px`;
    tooltip.style.top = `${top + window.scrollY}px`;
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
        alert('You need to be Level ' + skill.tier + ' to upgrade this skill!');
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
        alert('You need to be Level ' + skill.tier + ' to upgrade this skill!');
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
const canUpgrade = canUpgradeSkill(skill);

if (!canUpgrade && skill.rank === 0) {
    node.style.opacity = '0.35';
    node.style.filter = 'grayscale(85%) brightness(0.65)';
} else {
    node.style.opacity = '1';
    node.style.filter = '';
}
    
    // Update label
    if (node._skillLabel) {
        updateSkillLabel(node._skillLabel, skill);
    }
}
function getSkillBox(skillObj) {

    const el = document.querySelector(
        `[data-skill-id="${skillObj.id}"]`
    );

    if (!el) return null;

    const rect = el.getBoundingClientRect();

    return {
        left:
            rect.left -
            workspaceRect.left +
            elements.workspace.scrollLeft,

        right:
            rect.right -
            workspaceRect.left +
            elements.workspace.scrollLeft,

        top:
            rect.top -
            workspaceRect.top +
            elements.workspace.scrollTop,

        bottom:
            rect.bottom -
            workspaceRect.top +
            elements.workspace.scrollTop,

        centerX:
            rect.left +
            rect.width / 2 -
            workspaceRect.left +
            elements.workspace.scrollLeft,

        centerY:
            rect.top +
            rect.height / 2 -
            workspaceRect.top +
            elements.workspace.scrollTop
    };
}
// Draw connections
function drawConnections() {
    const svg = elements.connectionsSvg;
    svg.innerHTML = '';

    const ws = elements.workspace;
    const wsRect = ws.getBoundingClientRect();

    // --- helpers -----------------------------------------------------------

    /** Workspace-relative bounding box for a skill element */
    function getBox(skillId) {
        const el = document.querySelector(`[data-skill-id="${skillId}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const scrollLeft = ws.scrollLeft, scrollTop = ws.scrollTop;
        return {
            top:    r.top    - wsRect.top  + scrollTop,
            bottom: r.bottom - wsRect.top  + scrollTop,
            left:   r.left   - wsRect.left + scrollLeft,
            right:  r.right  - wsRect.left + scrollLeft,
            cx:     r.left + r.width  / 2 - wsRect.left + scrollLeft,
            cy:     r.top  + r.height / 2 - wsRect.top  + scrollTop,
        };
    }

    /**
     * Given two grid rows, return the Y coordinate of the midpoint of the
     * visual gap between them (average of the bottom of the upper row's
     * tallest element and the top of the lower row's shortest element).
     * Falls back to a simple geometric midpoint if no elements are found.
     */
    function gapY(upperRow, lowerRow) {
        const upper = state.skills.filter(s => s.row === upperRow);
        const lower = state.skills.filter(s => s.row === lowerRow);

        const bottoms = upper.map(s => getBox(s.id)?.bottom).filter(Boolean);
        const tops    = lower.map(s => getBox(s.id)?.top).filter(Boolean);

        if (!bottoms.length || !tops.length) return null;

        return (Math.max(...bottoms) + Math.min(...tops)) / 2;
    }

    /**
     * Given two grid cols, return the X coordinate of the midpoint of the
     * visual gap between them.
     */
    function gapX(leftCol, rightCol) {
        const left  = state.skills.filter(s => s.col === leftCol);
        const right = state.skills.filter(s => s.col === rightCol);

        const rights = left.map(s  => getBox(s.id)?.right).filter(Boolean);
        const lefts  = right.map(s => getBox(s.id)?.left).filter(Boolean);

        if (!rights.length || !lefts.length) return null;

        return (Math.max(...rights) + Math.min(...lefts)) / 2;
    }

    // -----------------------------------------------------------------------

    state.skills.forEach(skill => {
        if (!skill.connectsTo?.length) return;
        const sBox = getBox(skill.id);
        if (!sBox) return;

        skill.connectsTo.forEach(targetId => {
            if (!targetId) return;

            const targetSkill = state.skills.find(s => s.id === targetId);
            if (!targetSkill) return;
            const tBox = getBox(targetId);
            if (!tBox) return;

            const rowDiff = targetSkill.row - skill.row;   // + = target is lower
            const colDiff = targetSkill.col - skill.col;   // + = target is to the right

            let d = '';

            // ── SAME COLUMN ────────────────────────────────────────────────
            if (colDiff === 0) {
                // Exit bottom or top toward the target
                const startY = rowDiff > 0 ? sBox.bottom : sBox.top;
                const endY   = rowDiff > 0 ? tBox.top    : tBox.bottom;
                const x      = sBox.cx;

                // Are there any skills on this column between the two rows?
                const minRow = Math.min(skill.row, targetSkill.row);
                const maxRow = Math.max(skill.row, targetSkill.row);
                const blockers = state.skills.filter(
                    s => s.id !== skill.id && s.id !== targetId &&
                         s.col === skill.col && s.row > minRow && s.row < maxRow
                );

                if (blockers.length) {
                    // Route around: use the gap to the right of this column
                    const rightCol = skill.col + 1;
                    const laneX    = gapX(skill.col, rightCol) ?? sBox.right + 20;
                    d = `M ${x} ${startY} L ${laneX} ${startY} L ${laneX} ${endY} L ${x} ${endY}`;
                } else {
                    d = `M ${x} ${startY} L ${x} ${endY}`;
                }
            }

            // ── SAME ROW ───────────────────────────────────────────────────
            else if (rowDiff === 0) {
                const startX = colDiff > 0 ? sBox.right : sBox.left;
                const endX   = colDiff > 0 ? tBox.left  : tBox.right;
                const y      = sBox.cy;

                const minCol = Math.min(skill.col, targetSkill.col);
                const maxCol = Math.max(skill.col, targetSkill.col);
                const blockers = state.skills.filter(
                    s => s.id !== skill.id && s.id !== targetId &&
                         s.row === skill.row && s.col > minCol && s.col < maxCol
                );

                if (blockers.length) {
                    // Route around: use gap above this row (or below if none)
                    const upperRow = skill.row - 1;
                    const lowerRow = skill.row + 1;
                    const laneYUp  = gapY(upperRow, skill.row);
                    const laneYDn  = gapY(skill.row, lowerRow);
                    const laneY    = laneYUp ?? laneYDn ?? sBox.top - 20;
                    d = `M ${startX} ${y} L ${startX} ${laneY} L ${endX} ${laneY} L ${endX} ${y}`;
                } else {
                    d = `M ${startX} ${y} L ${endX} ${y}`;
                }
            }

            // ── DIAGONAL ───────────────────────────────────────────────────
// ── DIAGONAL ───────────────────────────────────────────────────
else {

    const startX = colDiff > 0 ? sBox.right : sBox.left;
    const endX   = colDiff > 0 ? tBox.left  : tBox.right;

    // lane beside source
    const sourceAdjCol = skill.col + Math.sign(colDiff);

    const sourceLaneX = colDiff > 0
        ? (gapX(skill.col, sourceAdjCol) ?? sBox.right + 20)
        : (gapX(sourceAdjCol, skill.col) ?? sBox.left - 20);

    // lane beside target
    const targetAdjCol = targetSkill.col - Math.sign(colDiff);

    const targetLaneX = colDiff > 0
        ? (gapX(targetAdjCol, targetSkill.col) ?? tBox.left - 20)
        : (gapX(targetSkill.col, targetAdjCol) ?? tBox.right + 20);

    // safe row gap
    const adjRow = skill.row + Math.sign(rowDiff);

    const laneY = rowDiff > 0
        ? (gapY(skill.row, adjRow) ?? sBox.bottom + 20)
        : (gapY(adjRow, skill.row) ?? sBox.top - 20);

    d = [
        // leave source
        `M ${startX} ${sBox.cy}`,

        // move into source column lane
        `L ${sourceLaneX} ${sBox.cy}`,

        // travel vertically in safe lane
        `L ${sourceLaneX} ${laneY}`,

        // cross horizontally in safe row gap
        `L ${targetLaneX} ${laneY}`,

        // rise/drop beside target
        `L ${targetLaneX} ${tBox.cy}`,

        // enter target edge center
        `L ${endX} ${tBox.cy}`,
    ].join(' ');
}

            // ── Draw the path ───────────────────────────────────────────────
            const active = skill.rank > 0 && targetSkill.rank > 0;
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', d);
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke', active ? '#ffd700' : 'rgba(255,215,0,0.4)');
            pathEl.setAttribute('stroke-width', active ? '2.5' : '2');
            pathEl.setAttribute('stroke-linejoin', 'round');
            pathEl.setAttribute('stroke-linecap', 'round');
            pathEl.setAttribute('stroke-dasharray', active ? 'none' : '5 4');
            if (active) pathEl.setAttribute('filter', 'drop-shadow(0 0 4px #ffd700)');
            pathEl.setAttribute('data-connection-source', skill.id);
            pathEl.setAttribute('data-connection-target', targetId);
            pathEl.classList.add('connection-path');
            svg.appendChild(pathEl);
        });
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
        alert(`You need to be Level ${skill.tier} to upgrade this skill!`);
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

    // normal skills
    state.skills.forEach(skill => {
        const rank = skill.rank || 0;

        for (let i = 1; i <= rank; i++) {
            if (i <= 4) spent += 1;
            else spent += 2;
        }
    });

    // custom skill (separate system)
    if (state.customSkill) {
        const s = state.customSkill;

        for (let i = 1; i <= s.rank; i++) {
            if (i <= 2) spent = 0; // starting investment
            else if (i <= 4) spent += 1;
            else spent += 2;
        }
    }

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
    document.getElementById('xpValue').textContent = `${state.totalXP}XP`;
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
                if (skill.rank >= 1) rbTotal += 1;
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
            isLocked: state.isLocked,
            customChoice: state.customChoice  // 'xp', 'skill', or null
        },
        character: {
            name: elements.charName.value,
            description: elements.charDesc.value,
            rank: elements.charRank.value,
            portrait: document.getElementById('charPortrait').src
        },
        skills: state.skills.map(skill => ({
            id: skill.id,
            rank: skill.rank,
            type: skill.type
        })),
        customSkill: state.customSkill ? {
            id: state.customSkill.id,
            label: state.customSkill.label,
            icon: state.customSkill.icon,
            rank: state.customSkill.rank,
            maxRank: state.customSkill.maxRank
        } : null
    };
    
    const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profileData.character.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
function loadProfile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // STATE RESTORE
            state.totalXP = data.state?.totalXP ?? 0;
            state.spentXP = data.state?.spentXP ?? 0;
            state.isLocked = data.state?.isLocked ?? false;
            state.customChoice = data.state?.customChoice ?? null;  // 'xp', 'skill', or null

            // CHARACTER DATA
            if (data.character?.name) elements.charName.value = data.character.name;
            if (data.character?.portrait) document.getElementById('charPortrait').src = data.character.portrait;
            if (data.character?.description) elements.charDesc.value = data.character.description;
            if (data.character?.rank) elements.charRank.value = data.character.rank;
            
            // SKILLS RESTORE
            state.skills.forEach(skill => {
                const saved = data.skills?.find(s => s.id === skill.id);
                if (saved) {
                    skill.rank = saved.rank ?? 0;
                    if (saved.type) skill.type = saved.type;
                } else {
                    skill.rank = 0;
                }
            });

            // CUSTOM SKILL RESTORE
            if (data.customSkill) {
                state.customSkill = {
                    id: data.customSkill.id || 'custom',
                    label: data.customSkill.label || 'Custom Skill',
                    icon: data.customSkill.icon || 'icons/default-skill.png',
                    rank: data.customSkill.rank || 2,
                    maxRank: data.customSkill.maxRank || 5
                };
            }

            // RESTORE UI BASED ON CHOICE
            const btn = document.getElementById("xpOrSkillBtn");
            const statusBox = document.getElementById("customChoiceStatus");
            const statusText = document.getElementById("customChoiceText");
            const removeBtn = document.getElementById("removeXpChoiceBtn");
            const slotFilled = document.getElementById("skillSlotFilled");
            const slotEmpty = document.getElementById("skillSlotEmpty");

            if (state.customChoice === 'xp') {
                // XP choice was made
                if (btn) btn.style.display = "none";
                if (statusBox) statusBox.style.display = "flex";
                if (statusText) statusText.textContent = "Choice locked: +2 XP gained";
                if (removeBtn) removeBtn.style.display = "flex";
                if (slotEmpty) slotEmpty.classList.add("hidden");
                /*if (slotFilled) {
                    slotFilled.classList.remove("hidden");
                    const icon = document.getElementById("customSkillIcon");
                    const name = document.getElementById("customSkillName");
                    if (icon) {
                        icon.src = "icons/xp-icon.png";
                        icon.style.border = "3px solid gold";
                        icon.style.boxShadow = "0 0 12px gold";
                    }
                    if (name) name.textContent = "+2 XP BONUS";
                }*/
            } else if (state.customChoice === 'skill') {
                // Skill choice was made
                if (btn) btn.style.display = "none";
                if (statusBox) statusBox.style.display = "flex";
                if (statusText) statusText.textContent = "Choice locked: Custom Skill created";
                if (removeBtn) removeBtn.style.display = "flex";
                renderCustomSkill();
            } else {
                // No choice made yet
                if (btn) btn.style.display = "flex";
                if (statusBox) statusBox.style.display = "none";
                if (slotFilled) slotFilled.classList.add("hidden");
                if (slotEmpty) slotEmpty.classList.remove("hidden");
                if (removeBtn) removeBtn.style.display = "none";
            }

            // FULL REBUILD
            recalculateXP();
            updateAll();
            renderSkillTree();
            drawConnections();

        } catch (err) {
            console.error('Error loading profile:', err);
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
        { level: '1', color: '#ffffff', xp: 1},
        { level: '2', color: '#3fff00', xp: 2 },
        { level: '3', color: '#1e90ff', xp:3},
        { level: '4', color: '#ffd700',xp:4},
        { level: '5', color: '#bf00ff', xp:6}
    ];

    container.innerHTML = '';

    levels.forEach(lvl => {
        const row = document.createElement('div');
        row.className = 'legend-row';

        row.innerHTML = `
                <div class="legend-box" style="border-color:${lvl.color}"></div>
                <span class="legend-text" >
                    — TIER ${lvl.level}
                    <span class="xp-cost">(-${lvl.xp} XP)</span>
                    <span class="rb-gain">(+${lvl.xp} RB)</span>
                </span>
            `;

        container.appendChild(row);
    });
}

function createCustomSkill() {
    const name = prompt("Name your custom skill:");
    if (!name) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    document.body.appendChild(input);

    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) {
            document.body.removeChild(input);
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            state.customSkill = {
                id: "custom",
                label: name,
                icon: event.target.result,
                rank: 2,
                maxRank: 5
            };

            state.customChoice = 'skill';

            renderCustomSkill();
            setCustomChoiceDisplay("skill");
            lockCustomChoice("skill");

            document.body.removeChild(input);
        };

        reader.readAsDataURL(file);
    });

    document.getElementById("removeXpChoiceBtn").style.display = "none";
    setTimeout(() => input.click(), 0);
}
function setCustomChoiceDisplay(type) {
    const box = document.getElementById("customChoiceStatus");
    const text = document.getElementById("customChoiceText");

    if (!box || !text) return;

    box.style.display = "flex";

    if (type === "xp") {
        text.textContent = "Choice locked: +2 XP gained";
        document.getElementById("removeXpChoiceBtn").style.display = "flex";
    } else if (type === "skill") {
        text.textContent = "Choice locked: Custom Skill created";
        document.getElementById("removeXpChoiceBtn").style.display = "flex";
    }
}
function lockCustomChoice(type) {
    state.customChoice = type;  // 'xp' or 'skill'
    
    const btn = document.getElementById("xpOrSkillBtn");
    if (btn) btn.style.display = "none";
}
function renderCustomSkill() {
    const icon = document.getElementById("customSkillIcon");
    const name = document.getElementById("customSkillName");
    const slot = document.getElementById("skillSlotFilled");
    const empty = document.getElementById("skillSlotEmpty");

    // XP MODE
    if (state.customChoice === 'xp') {
        icon.src = "icons/xp-icon.png";
        name.textContent = "+2 XP BONUS";
        icon.style.border = "3px solid gold";
        icon.style.boxShadow = "0 0 12px gold";
        empty.classList.add("hidden");
        slot.classList.remove("hidden");
        return;
    }

    // SKILL MODE
    if (state.customChoice === 'skill' && state.customSkill) {
        const skill = state.customSkill;
        icon.src = skill.icon;
        name.textContent = skill.label;

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
        icon.style.borderColor = colors.border;
        icon.style.borderWidth = colors.width;
        icon.style.boxShadow = colors.shadow;
        icon.style.borderStyle = 'solid';
        icon.style.animation = level === 5 ? 'pulse-glow 2s ease-in-out infinite' : '';

        const nameColors = { 0: '#ffffff', 1: '#ffffff', 2: '#3fff00', 3: '#1e90ff', 4: '#ffd700', 5: '#bf00ff' };
        name.style.color = nameColors[level] || '#ffffff';
        name.textContent = skill.label;

        empty.classList.add("hidden");
        slot.classList.remove("hidden");
        slot.onclick = () => upgradeCustomSkill();
    }
}
function upgradeCustomSkill() {
    const skill = state.customSkill;
    if (!skill) return;

    const maxRank = skill.maxRank;
    const availableXP = state.totalXP - state.spentXP;

    if (skill.rank >= maxRank) {
        skill.rank = 1;
    }

    const nextLevel = skill.rank + 1;

    // same cost system as your tree
    let cost = 0;
    for (let i = skill.rank + 1; i <= nextLevel; i++) {
        cost += (i <= 4) ? 1 : 2;
    }

    if (availableXP < cost) {
        alert("Not enough XP!");
        return;
    }

    saveHistory();

    skill.rank++;
    updateAll();
    renderCustomSkill();
}
  function gainCustomXP() {
    saveHistory();
    state.totalXP += 2;
    state.customChoice = 'xp';
    updateAll();
}
document.getElementById("xpOrSkillBtn").addEventListener("click", () => {
    if (state.customChoice) {
        alert("You already made this choice.");
        return;
    }

    const choice = confirm(
        "Choose your bonus:\n\n" +
        "OK = Gain +2 XP\n" +
        "Cancel = Create Custom Skill"
    );

    if (choice) {
        gainCustomXP();
        setCustomChoiceDisplay("xp");
        lockCustomChoice("xp");
    } else {
        createCustomSkill();
    }
});
function removeCustomChoice() {
    if (!state.customChoice) return;

    if (!confirm("Remove this choice?")) return;

    saveHistory();

    if (state.customChoice === 'xp') {
        state.totalXP -= 2;
    }

    if (state.customChoice === 'skill') {
        state.customSkill = null;
    }

    state.customChoice = null;

    document.getElementById("customChoiceStatus").style.display = "none";
    document.getElementById("skillSlotFilled").classList.add("hidden");
    document.getElementById("skillSlotEmpty").classList.remove("hidden");
    document.getElementById("xpOrSkillBtn").style.display = "flex";
    document.getElementById("removeXpChoiceBtn").style.display = "none";

    updateAll();
}
document.getElementById("removeSkillBtn").onclick = (e) => {
    e.stopPropagation(); // 🔥 THIS FIXES YOUR BUG
    removeCustomChoice();
};
document.getElementById("removeXpChoiceBtn").addEventListener("click", () => {
    // Remove XP (adjust if you store it differently)
    
    removeCustomChoice();

    // Clear UI
   /*  const box = document.getElementById("customChoiceStatus");
     box.style.display = 'none';
    removeXpChoiceBtn.classList.add("hidden");

     
    const btn = document.getElementById("xpOrSkillBtn");
    if (btn) btn.style.display = "flex";
    state.totalXP -= 2;
    state.customSkillUsed = false;
    state.customXPBonus = false;
    updateAll();()*/
 
});
// Initialize
document.addEventListener('DOMContentLoaded', init);