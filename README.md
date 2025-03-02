# Obsidian TTRPG Statblocks

Create, manage, and view a TTRPG Bestiary in Obsidian.md.

<img src="https://raw.githubusercontent.com/valentine195/obsidian-5e-statblocks/beta/images/example.PNG">

> **:pencil: Homebrew**
>
> The plugin is used to manage

# Usage

A statblock may be defined in a note using the syntax below.

All fields are optional - if not provided, that Statblock will simply not render them.

The `monster` field may be combined with other fields to override the field. See [Overriding Fields](#Overriding-Fields).

The spellcasting trait requires a special field (`spells`) - See [Spellcasting](#Spellcasting)

> **:warning: YAML Syntax**
>
> Please note that the parameters provided in the statblock are parsed as [yaml](https://yaml.org/spec/1.2.2/).
>
> YAML is incredibly powerful, but you must pay attention to your syntax or you may get errors!
>
> Common errors include: not putting quotes around parameters with `:` or `*` (such as **Melee Weapon Attack:**) and not indenting properly.

````
```statblock
monster: <SRD/Homebrew Monster Name>
```
````

OR

````
```statblock
image: [[Wikilink To Image]]
name: string
size: string
type: string
subtype: string
alignment: string
ac: number
hp: number
hit_dice: string
speed: string
stats: [number, number, number, number, number, number]
fage_stats: [number, number, number, number, number, number, number, number, number]
saves:
  - <ability-score>: number
skillsaves:
  - <skill-name>: number
damage_vulnerabilities: string
damage_resistances: string
damage_immunities: string
condition_immunities: string
senses: string
languages: string
cr: number
spells:
  - <description>
  - <spell level>: <spell-list>
traits:
  - [<trait-name>, <trait-description>]
  - ...
actions:
  - [<trait-name>, <trait-description>]
  - ...
legendary_actions:
  - [<legendary_actions-name>, <legendary_actions-description>]
  - ...
reactions:
  - [<reaction-name>, <reaction-description>]
  - ...
```
````

## Using [Dice Roller](https://github.com/valentine195/obsidian-dice-roller)

You can integrate the dice roller plugin in your statblocks, which will allow you to roll dice inside stat blocks. This integration requires the following:

1. Install and enable the [Dice Roller](https://github.com/valentine195/obsidian-dice-roller) plugin.
2. Enable [Integrate Dice Roller](#integrate-dice-roller) in settings or add the `dice: true` parameter to a statblock in a note.

The plugin will then parse monster properties for common types of dice rolls. The plugin will create dice rollers for the following strings:

1. Rolling to hit (`+15 to hit`)
2. Damage / healing (`19 (2d10 + 8)`)
3. A save (`Strength +5`)

> Want to change how Dice Rollers are added? Create a [Custom Layout](#layouts) in settings.

### Rendered Dice

Dice rollers added to stat blocks can roll 3D dice on the screen if the [Render Dice Rolls](#render-dice-rolls) setting is turned on or the `render: true` parameter is added to a stat block.

<img src="https://raw.githubusercontent.com/valentine195/obsidian-5e-statblocks/beta/images/render.gif">

## Images

Images can be added to the statblock using the `image` parameter. This should be a wikilink to an image located somewhere in your vault.

The image will be placed next to the name, centered inside a 75px circle.

## Overriding Fields

The `monster` field may be combined with other fields to override the field of the specified SRD monster. For example:

````
```statblock
monster: Ancient Black Dragon
name: Paarthurnax
```
````

<img src="https://raw.githubusercontent.com/valentine195/obsidian-5e-statblocks/beta/images/override.PNG">

## Traits

Traits, as well as Actions, Reactions and Legendary Actions, should be added by specifying a name and description (desc):

```md
traits:

-   name: Amphibious
    desc: The dragon can breathe air and water.
-   name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
```

## Spellcasting

The spellcasting trait requires a special `spells` field using the following syntax:

> **Please Note:**
>
> Overriding an existing monster's spells replaces the spells, _it does not combine_.

````
```statblock
spells:
  - The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared
  - Cantrips (at will): fire bolt, light, mage hand, prestidigitation, shocking grasp
  - 1st level (4 slots): detect magic, identify, mage armor*, magic missile
  - 2nd level (3 slots): detect thoughts, mirror image, misty step
  - 3rd level (3 slots): counterspell, fly, lightning bolt
  - 4th level (3 slots): banishment, fire shield, stoneskin*
  - 5th level (3 slots): cone of cold, scrying, wall of force
  - 6th level (1 slot): globe of invulnerability
  - 7th level (1 slot): teleport
  - 8th level (1 slot): mind blank*
  - 9th level (1 slot): time stop
  - "* The archmage casts these spells on itself before combat."
```
````

## Fantasy AGE

Those of you using the plugin for Fantasy AGE may use `fage_stats` to set the nine stats.

## Full Example

````
```statblock
image: [[Ancient Black Dragon.jpg]]
name: Ancient Black Dragon
size: Gargantuan
type: dragon
subtype:
alignment: chaotic evil
ac: 22
hp: 367
hit_dice: 21d20
speed: 40 ft., fly 80 ft., swim 40 ft.
stats: [27, 14, 25, 16, 15, 19]
saves:
  - dexterity: 9
  - constitution: 14
  - wisdom: 9
  - charisma: 11
skillsaves:
  - perception: 16
  - stealth: 9
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 26
languages: Common, Draconic
cr: 21
traits:
  - name: Amphibious
    desc: The dragon can breathe air and water
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage."
  - name: Claw
    desc: "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage."
  - name: Tail
    desc: "Melee Weapon Attack: +15 to hit, reach 20 ft ., one target. Hit: 17 (2d8 + 8) bludgeoning damage."
  - name: Frightful Presence
    desc: "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
  - name: Acid Breath (Recharge 5-6)
    desc: The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one.
reactions:
  - name: Amphibious
    desc: The dragon can breathe air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
legendary_actions:
  - name: Detect
    desc: The dragon makes a Wisdom (Perception) check.
  - name: Tail Attack
    desc: The dragon makes a tail attack.
  - name: Wing Attack (Costs 2 Actions),
    desc: The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
spells:
  - The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared
  - Cantrips (at will): fire bolt, light, mage hand, prestidigitation, shocking grasp
  - 1st level (4 slots): detect magic, identify, mage armor*, magic missile
  - 2nd level (3 slots): detect thoughts, mirror image, misty step
  - 3rd level (3 slots): counterspell, fly, lightning bolt
  - 4th level (3 slots): banishment, fire shield, stoneskin*
  - 5th level (3 slots): cone of cold, scrying, wall of force
  - 6th level (1 slot): globe of invulnerability
  - 7th level (1 slot): teleport
  - 8th level (1 slot): mind blank*
  - 9th level (1 slot): time stop
  - "* The archmage casts these spells on itself before combat."
```
````

## Columns

The plugin will intelligently create two columns if the stat block it is rendering is long and there is enough space for the second column.

<img src="https://raw.githubusercontent.com/valentine195/obsidian-5e-statblocks/beta/images/columns.png">

You can customize the behavior of the columns with a few different parameters:

| Parameter      | Behavior                                                           | Default |
| -------------- | ------------------------------------------------------------------ | :-----: |
| `columns`      | Customize the number of columns that will be rendered.             |         |
| `columnWidth`  | Customize the width of the columns in **pixels**.                  |   400   |
| `columnHeight` | Maximum height of a column before wrapping in **pixels**.          |   600   |
| `forceColumns` | The plugin will create the columns regardless of note page sizing. |  false  |

> **:pencil: Note!**
>
> If you set `columns`, the plugin will _always_ try to split the statblock into that many columns, regardless of height.
>
> It will still respect the width of the note, unless `forceColumns` is set.

# The Bestiary

The statblock plugin maintains a collection of creatures that can be referenced in statblocks and used in other plugins, such as the [initiative tracker](https://github.com/valentine195/obsidian-initiative-tracker).

## Adding Creatures to the Bestiary

You can add your own custom monsters to this bestiary in a few ways.

### Creating Creatures in Notes

Homebrew creatures can be saved by creating a custom monster in a statblock codeblock in a note, as described in [the usage section](#usage).

You can either fully define your own custom monster, or use an existing monster in your bestiary and [override fields](#overriding-fields).

When a statblock has been rendered, you may save the creature by clicking the menu icon in the top right and selecting "Save to Bestiary".

<img src="https://raw.githubusercontent.com/valentine195/obsidian-5e-statblocks/beta/images/save.png">

### Creating Creatures in Frontmatter

Because the plugin uses YAML for its syntax, a statblock created using the statblock codeblock is valid note frontmatter.

Any note given the `statblock: true` parameter in its frontmatter will have its frontmatter parsed for a custom monster if [Parse Frontmatter in Notes](#parse-frontmatter-for-creatures) is turned on in [Settings](#settings) or if the "Parse Frontmatter in Notes" command is used.

**The note must also have a `name` parameter in the frontmatter to save the creature. All other fields are optional.**

Once the creature has been found in a note, it will be added to the bestiary and synced with the note content.

If the statblock field is removed or set to false, or the note is deleted, the creature will be removed from the bestiary.

### Creating Creatures in Settings

Creatures can be created directly in settings under the [Homebrew Creatures](#homebrew-creatures) section by clicking the "Add Creature" button.

Creatures can be created using either the YAML syntax shown above or by JSON.
### Importing Creatures

Creatures can be imported into the bestiary in [settings](#import-creatures) from various common sources.

**:warning: Please only import content that you own and have legal access to.**

Additionally, creatures can be imported as straight JSON.

## Accessing the Bestiary

Your bestiary lives on the plugin and can be accessed programmatically in plugins that can run JavaScript, such as [Dataview](https://github.com/blacksmithgu/obsidian-dataview), [Templater](https://github.com/SilentVoid13/Templater) or [CustomJS](https://github.com/samlewis0602/obsidian-custom-js).

A readonly copy of the bestiary is available on the `window` object and can be accessed in your scripts like this:

```js
const bestiary = app.plugins.getPlugin("obsidian-5e-statblocks").bestiary;
//or
const bestiary = window.bestiary;
```

This will give you a readonly JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

Creatures are stored on the Bestiary by name - you could retrieve a creature from the bestiary like this:

```js
const ancient_black_dragon = bestiary.get("Ancient Black Dragon");
```

Or, a list of all creatures:

```js
const creatures = bestiary.values();
```

# Customizing the CSS

The statblocks generated can be customized using [CSS snippets](https://help.obsidian.md/How+to/Add+custom+styles#Use+Themes+and+or+CSS+snippets).

## Targeting a Statblock

A rendered statblock can be targeted in CSS using the `.statblock` CSS class.

### Targeting Specific Layouts

Additionally, if you are using a [Layout](#layouts), the slugified layout name is added to the statblock element.

For example, the "Basic 5e Layout" (default) will be added to the statblock container as `.basic-5e-layout`.

### Targeting Specific Monsters

Like layouts, Monster names are slugified and added to the statblock container as classes.

For example, a statblock rendering an Ancient Black Dragon will receive the `.ancient-black-dragon` class.

## Colors

The plugin creates and uses 4 CSS variables to determine the color of the statblocks.

```css
:root {
    --statblock-primary-color: #7a200d;
    --statblock-rule-color: #922610;
    --statblock-bar-color: #e69a28;
    --statblock-background-color: #fdf1dc;
}
```

These can be overridden globally (on the `:root` element) to change the default color _globally_, or to the statblock containers themselves to [target specific statblocks](#targeting-a-statblock).

# Layouts

As of TTRPG Statblocks v2.0.0, custom layouts may be created in settings. The basic 5e layout will always exist, but the default layout used by the plugin may be changed.

## Using a Layout

A statblock will use the Default Layout specified in settings, unless a layout is specified in the statblock parameters:

````
```statblock
monster: Ancient Black Dragon
layout: My Custom Layout
```
````

## Creating a Layout

New layouts are created through settings, either by clicking the "New Layout" button or copying an existing layout and clicking the "Edit" button.

This will open the layout creator, where [**layout blocks**](#blocks) can be added and managed to the layout.

### Names

Layouts must be given names, and the names **must be unique.**

### Blocks

Statblock layouts are made up of blocks. There are several types of blocks, and each block can be associated to a monster **property.**

Blocks can be added to the layout by clicking the "Add Block" button, where the type of block may be selected. Once a block is added to the layout, it may be edited by clicking the "Edit Block" button that appears when the block is hovered or removed by clicking the "Delete Block" button.

Additionally. blocks may be moved around by clicking the drag handle and dragging them around.

### Creating Blocks

A layout block has a **type**, and the type determines both how it renders and what options are available to the block. Once a block is created, its type cannot be changed.

Blocks further have **properties** that will affect _how_ it renders.

#### Block Properties

All blocks (except [group](#group-blocks) and [inline](#inline-blocks)) will have the following property fields:

| Property              | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Link Monster Property | The "property" the block will try to access on the monster object (for example, "name"). |
| Conditional           | If a block is set to conditional, it won't be rendered if the property does not exist.   |
| Fallback              | Fallback to display if property does not exist but the block is not conditioned.         |
| Has Rule              | A horizontal rule will be displayed after the property                                   |
| Parse for Dice\*      | The plugin will attempt to parse for common dice roll strings from the block             |
| Link Dice to Property | The layout will use the property provided to generate the dice roller.                   |
| Dice Callback\*†      | JavaScript code may be provided to determine how the string is parsed for dice.          |

<sup>\* Requires the <a href="https://github.com/valentine195/obsidian-dice-roller">Dice Roller</a> plugin.</sup><br/>
<sup>† Advanced option.</sup>

A specific block type may have additional property fields.

Additionally, there are "Advanced Options" for blocks. Advanced options allow you to provide JavaScript callbacks to parse monster properties, and should return strings.

#### Group Blocks

Group blocks allow several different types of blocks to be grouped together. Additional blocks can be added to the group block using the context menu (three dots), or by dragging blocks into the square.

#### Inline Blocks

Inline blocks are like group blocks, but blocks grouped inside them will render next to each other instead of on top. Additional blocks can be added to the group block using the context menu (three dots), or by dragging blocks into the square.

#### Heading Blocks

Heading blocks will render text larger (like the name of the basic 5e layout).

> Property Type Required: the Heading block should point to a monster property that will be a string.

#### Subheading Blocks

Subheading blocks are for smaller properties, such as the type of monsters in the basic 5e layout.

The subheading block allows multiple monster properties to be linked to it.

> Property Type Required: the Subheading block should point to a monster property that can be turned into a string. The plugin will recursively stringify non-string items.

#### Image Blocks

Image blocks will display an image if the linked property is a link to an image. This link should be an Obsidian wikilink to an image in the vault. A link to an external website may also be used, but you may run into issues with privacy settings.

> Property Type Required: the Image block should point to a monster property will be a string.

#### Property Block

A property block is the standard block. It will display the property name and the value of the property for the monster - for example, `Armor Class: 16`.

> Property Type Required: the Property block should point to a monster property that can be turned into a string. The plugin will recursively stringify non-string items.

Property blocks have an additional advanced option to provide a callback to parse the property and use that as the value of the field. The callback will receive the monster object and the plugin as parameters.

For example, the basic 5e layout's Proficiency Bonus property uses this option to determine its property values:

```js
if ("cr" in monster && monster.cr in plugin.CR) {
    return `+${Math.floor(2 + ((plugin.CR[monster.cr]?.value ?? 0) - 1) / 4)}`;
}
return "";
```

#### Saves Block

The saves block is used to display saves and skill saves, for example: `Str: +3`.

> Property Type Required: the Saves block should point to a monster property that is an **object** of string number pairs, for example:

````
```statblock
saves:
  - strength: 3
  - dexterity: 5
```
````

#### Spells Block

The spells block is how the plugin displays spells. See [the Spells section](#spellcasting) for how a spell's block property should be formatted.

#### Table Block

The table block will display a table of headers and values.

The table block has an additional block property called "Table Headers". **The layout will only display a value that has a header.** This means if your monster property has 6 values, but you specify 5 headers, **only the first five values will be shown.**

> Property Type Required: the Table block should point to a monster property that is an **array of numbers**.

#### Traits Block

The traits block is how the plugin displays things like Actions, Reactions and Traits.

The traits block has an additional optional block property called "Section Heading". This will be added to the statblock prior to the traits display.

> Property Type Required: the Traits block should point to a monster property that is an **array of [string, string] values**.

### Using Dice Rollers in Layouts

You can integrate the dice roller plugin in your statblocks, which will allow you to roll . This integration requires the following:

1. Install and enable the [Dice Roller](https://github.com/valentine195/obsidian-dice-roller) plugin.
2. Enable [Integrate Dice Roller](#integrate-dice-roller) in settings.
3. Toggle the [Parse for Dice](#block-properties) block property for the block you want to parse.

The plugin will then attempt to parse the property content for common dice roll strings. The plugin will parse the following strings by default:

1. Rolling to hit (`+15 to hit`)
2. Damage / healing (`19 (2d10 + 8)`)
3. A save (`Strength +5`)

Alternatively, you may specify a property of a monster to use as the dice string in the [Link Dice to Property](#block-properties) block property. This should be a dice string, such as `5d10 + 50`.

#### Dice Callback

If [Advanced Options](#show-advanced-options) is turned on, you also have the ability to provide a `Dice Callback` function to the block. This allows you to parse the property string for the _exact_ dice roll you want.

The callback function will receive the `plugin`, `monster` and `property` parameters.

# Settings

## Enable Export to PNG

The plugin will add an option to export rendered stat blocks as PNG files.

## Integrate Dice Roller

The plugin will integrate with the Dice Roller plugin and add dice rolls to rendered stat blocks.

## Render Dice Rolls

Dice rolls will roll with graphical dice by default.

## Note Parsing

### Parse Frontmatter for Creatures

The plugin will automatically parse the folder specified in [Bestiary Folder](#bestiary-folder) for creatures.

If turned off, the plugin can be told to parse for creatures using the "Parse Frontmatter for Creatures" command.

### Bestiary Folder

The plugin will only parse files in this folder for creatures.

## Layouts

### Default Layout

The plugin will use this layout by default when rendering a stat block.

### Show Advanced Options

Editing a layout block will show additional advanced options.

## Import Creatures

Homebrew creatures can be imported from various sources here.

## Homebrew Creatures

A list of the current creatures in the bestiary.

Additional creatures can be [created](#creating-creatures-in-settings) here using YAML or JSON.

Creatures can be filtered, removed, edited and previewed in this section.

# Installation

## From within Obsidian

From Obsidian v0.9.8, you can activate this plugin within Obsidian by doing the following:

-   Open Settings > Third-party plugin
-   Make sure Safe mode is **off**
-   Click Browse community plugins
-   Search for this plugin
-   Click Install
-   Once installed, close the community plugins window and activate the newly installed plugin

## From GitHub

-   Download the Latest Release from the Releases section of the GitHub Repository
-   Extract the plugin folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`  
    Note: On some machines the `.obsidian` folder may be hidden. On MacOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.
-   Reload Obsidian
-   If prompted about Safe Mode, you can disable safe mode and enable the plugin.
    Otherwise head to Settings, third-party plugins, make sure safe mode is off and
    enable the plugin from there.

### Updates

You can follow the same procedure to update the plugin

# Warning

This plugin comes with no guarantee of stability and bugs may delete data.
Please ensure you have automated backups.

# TTRPG plugins

If you're using Obsidian to run/plan a TTRPG, you may find my other plugin useful:

-   [Obsidian Leaflet](https://github.com/valentine195/obsidian-leaflet-plugin) - Add interactive maps to Obsidian.md notes
-   [Dice Roller](https://github.com/valentine195/obsidian-dice-roller) - Inline dice rolling for Obsidian.md
-   [Initiative Tracker](https://github.com/valentine195/obsidian-initiative-tracker) - Track TTRPG Initiative in Obsidian

<a href="https://www.buymeacoffee.com/valentine195"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=valentine195&button_colour=e3e7ef&font_colour=262626&font_family=Inter&outline_colour=262626&coffee_colour=ff0000"></a>
