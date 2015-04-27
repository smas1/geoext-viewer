# Introduction #

This lines out the development plan for december 2013 through march, 2014.
This involves mainly sponsored work for Warwickshire CC, but also other features may be added.
The Heron [Roadmap](Roadmap.md) is always leading. All related issues are tagged with "Project=Warwick-Ph2".
[See the full list](https://code.google.com/p/geoext-viewer/issues/list?can=1&q=Project%3DWarwick-Ph2).

# Features #
The Features (items) to be developed with estimates in 8h days (loaded, i.e. including overheads) plus
priority (bold) are listed below. The name after the item denotes its implementer. Striked-through indicates that the item has been done.

  1. ~~Delete nodes from drawing (3d, **4**) **Just**~~ (works already in OLEditor: go in Edit (pen icon) mode, mouse over vertex and press 'd'!)
  1. ~~FeatureInfo responses as a Vertical List - [issue 317](https://code.google.com/p/geoext-viewer/issues/detail?id=317) - (4d, **3**) **Aris (Rinke)** **DONE**~~
  1. ~~Export to JPG/other formats with MFP -  [issue 189](https://code.google.com/p/geoext-viewer/issues/detail?id=189) - (3d, **1**) **Just** **DONE**~~
  1. Add layers from a catalogue - [issue 324](https://code.google.com/p/geoext-viewer/issues/detail?id=324) - (10d, **8**) **Just** **AFTER FEB**
  1. ~~Specify columns in FeatureInfo results - [issue 333](https://code.google.com/p/geoext-viewer/issues/detail?id=333) - (2d) **WCC/Jonathan** integration  by **Aris (Rinke)** **DONE**~~
  1. ~~Remove specified columns from all FeatureInfo/search results - [issue 306](https://code.google.com/p/geoext-viewer/issues/detail?id=306) - (2d) **WCC/Jonathan** integration by  **Just** **DONE**~~
  1. ~~Styling of subsets of data -  [issue 331](https://code.google.com/p/geoext-viewer/issues/detail?id=331) - (2d, **7**) **Just** **DONE**~~
  1. ~~Layer ordering when toggled - [issue 332](https://code.google.com/p/geoext-viewer/issues/detail?id=332) - (2d, **5**)  **Aris (Rinke)** **DONE**~~
  1. ~~Save and load bookmarks -  [issue 313](https://code.google.com/p/geoext-viewer/issues/detail?id=313) - (4d, **2**)  **Aris (Rinke)** **DONE**~~
  1. ~~Vector Styling : line+fill styles and selecting point symbols - [issue 329](https://code.google.com/p/geoext-viewer/issues/detail?id=329) - (9d, **6**) **Just** **DONE**~~
  1. Integrate Google StreetView - [issue 233](https://code.google.com/p/geoext-viewer/issues/detail?id=233) - **WCC/Jonathan** STATUS? integration  by (TBD)

Details for each feature are below.

# Feature Details #

## Definitions ##

Implementer = Person/organisation that is deploying Heron on their systems. Assume only basic JavaScript knowledge. No tool should ever need the implementer to change any Heron source code.

User = End User of a deployed Heron Client.

## Items ##

Below items with their details. For each item one or more issues will/should be opened.

### 1.  Delete nodes from drawing ###
OpenLayers Editor - Create the ability to delete a specified node of a polygon or line feature using the editing tools.

### 2. FeatureInfo responses as a vertical list ###
The ability for the implementer to set it so that the result for a FeatureInformation request appears as a single vertically aligned result. Example of vertical result:

![http://lynx-info.com/images/software-arcextns/clickrelate_arcmap.png](http://lynx-info.com/images/software-arcextns/clickrelate_arcmap.png)

  * If results from multiple layers, use tabs as the current FeatureInfo result does.
  * If multiple results within a single layer, allow the user to "scroll" between them using Obvious Left <- and right -> arrows.
  * A button that the user can use to swap between vertical results and the (current) horizontal layout and back again.
  * For search results (i.e. multi search centre), an icon next to the left of each result that allows the user to open that individual result in a vertical pane for easier reading.

**Issue**: [issue 317](https://code.google.com/p/geoext-viewer/issues/detail?id=317)

### 3. Export to JPG/other formats with MFP ###
Extend GeoExt/Heron to allow printing in other formats (i.e. jpeg, tif, bmp) from the print-preview dialog, and also to allow "direct print" to use it too. This should list all formats supported by MFP, which are reported using "outputFormats" from the info.json page. Also configuration by the implementer for which of those to allow/disallow (so something much be allowed by both the implementer and the outputFormats to actually be listed).

**Issue**: [issue 189](https://code.google.com/p/geoext-viewer/issues/detail?id=189).

### 4. Add layers from a catalogue ###
Implement a catalogue function to allow the user to pull layers from any of WMS/WFS/TMS/WMTS etc. Similar to http://suite.opengeo.org/geoexplorer/composer

  * The implementer can pre-specify systems (probably with a "name", "description" as well as the URL) which will appear in a list. The software will present these server options to the user in some way so they can decide what to connect to.
  * User can optionally add their own system (anything supported by OpenLayers) if they know the URL for it.
  * Ability to Browse all layers listed in the GetCapabilities of any supported OpenLayers service.
  * Should list Abstract information for the layer (from GetCapabilities) and anything else pertinent from the response.
  * Added layers should be remembered in bookmarks if saved as such.
  * Ability for user to search catalogue (case insensitive), probably via a dynamic search box (similar to Google suggestions). It should search at least the title, but also keywords and maybe abstract too.
  * Layers added later should be on top of layers added earlier.
Also allow the user to specify their own OGC server by entering its URL. Ideally this would integrate with the bookmarks so a user could save the bookmark and have the same layers re-added when they reload the bookmark. http://suite.opengeo.org/geoexplorer/composer
Optional
  * ability to specify which style to use if multiple are declared in that portion of the WMS GetCapabilities.

**Issue**: [issue 324](https://code.google.com/p/geoext-viewer/issues/detail?id=324)

### 5.  Specify columns in FeatureInfo results ###
The ability for the implementer to specify a maximum "auto width" for horizontal FeatureInfo results. Ideally also carried over as an option for the search results too.

  * Implementer option to set maximum-width.
  * Width of FeatureInfo results will be the minimum necessary to accommodate the
content & title.
  * Width will never be auto-scale to be wider than specified maximum width.
  * User can set width wider or smaller than these limits manually if desired.

### 6. Remove specified columns from all FeatureInfo/search results ###
Allow the implementer to pre-specify columns in the WFS results that will never show up in results. Should also carry over to export of data.

**Issue**: [issue 306](https://code.google.com/p/geoext-viewer/issues/detail?id=306).

### 7. Styling of subsets of data ###
The ability for an implementer to create a categorised/themed style for a layer (i.e., Primary schools in red, secondary schools in yellow), and toggle individual styles on and off within the layer (i.e. turn off primary schools).

### 8. Layer ordering when toggled ###
Allow an implementer option that makes the layer ordering on the map be the same as the layer ordering in the layertree (top to bottom).

### 9.  Save and load bookmarks ###
The ability for a user to save their bookmark external to their browser, and also to load other, externally supplied bookmarks. This would provide a function like an !ArcGIS MXD Workspace or QGIS Project.

**Issue**: [issue 313](https://code.google.com/p/geoext-viewer/issues/detail?id=313).

### 10.  Vector Styling : line+fill styles and selecting point symbols ###

Set of styling tools which would allow users to choose line and fill styles when drawing features, and selecting from a range of point symbol

Heron has a basic implementation but this is inadequate for our needs, so we would like them extended to include the following. This is applicable only to redlining, however we're not averse to these behaviours also being carried over to other styling functions.
All items as drawn/styled should be printable with that drawn/style.

The user can specify all of the below:

- Ability to style individual features differently. Have a red polygon and a blue polygon and a transparent polyon if wanted. This should also carry over to feature types. Along with those polygons, the user at the same time can style purple lines, pink lines, oranges, and blue labels. See image.

https://dl.dropboxusercontent.com/s/4m218g4e1hv50yi/RFQ-item10-drawing%20tools.png?dl=1&token_hash=AAEnNl8NBL7wPwiVap9OJPbxgJpsPPOMHfqYkmU83gEm-A

- Polygons:
  * strokes width
  * stroke colour
  * stroke-dash (optional - with ability to set dash-array type)
  * stroke transparency
  * fill colour
  * fill transparency
  * fill pattern (i.e. hatch)

- Lines:
  * strokes width
  * stroke colour
  * stroke-dash (optional - with ability to set dash-array type)
  * stroke transparency

- Points:
  * Type of symbols (all OGC/OpenLayers symbols - http://openlayers.org/dev/examples/graphic-name.html )
  * Symbol colour
  * Symbol size
  * Symbol transparency

**Optional 1:**

Extra symbology for labels is optional

- Labels:
  * Set Font family
  * Set Font colour
  * Set Font Size
  * Set bold/italic
  * Set mask/halo size
  * set mask/halo colour

**Optional 2:**

Symbology is saved when drawing layer is exported.

**Issue**: [issue 329](https://code.google.com/p/geoext-viewer/issues/detail?id=329).

### 11. Integrate  Google StreetView ###

Integration of a patch to get Heron to request Google StreetView to open in a new browser window.

**Issue**: [issue 233](https://code.google.com/p/geoext-viewer/issues/detail?id=233).