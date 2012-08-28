/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.namespace("Heron.widgets");
Ext.namespace("Heron.utils");

/** api: (define)
 *  module = Heron.widgets
 *  class = FeatureInfoPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatureInfoPanel. All regular ExtJS `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 *  config params also apply.
 *  The ``infoFormat`` config parameter is the default ``INFO_FORMAT`` to be used for WMS GetFeatureInfo (GFI).
 *  This value can be overruled by an optional per-Layer ``infoFormat`` WMS config parameter.
 *
 *  .. code-block:: javascript
 *
 *		 {
 *			 xtype: 'hr_featureinfopanel',
 *			 id: 'hr-feature-info',
 *			 region: "south",
 *			 border: true,
 *			 collapsible: true,
 *			 collapsed: true,
 *			 height: 205,
 *			 split: true,
 *			 infoFormat: 'application/vnd.ogc.gml',
 *			 displayPanels: ['Grid', 'XML'],
 *			 maxFeatures: 10
 *		 }
 *
 */

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A tabbed panel designed to hold GetFeatureInfo for multiple layers.
 */
Heron.widgets.FeatureInfoPanel = Ext.extend(Ext.Panel, {
	/** api: config[maxFeatures]
	 *  ``String``
	 *  Default GFI MAX_FEATURES parameter Will be ``5`` if not set.
	 */
	maxFeatures	: 5,

	/** api: config[displayPanels]
	 *
	 * Types of Panels to display GFI info in, default is a grid table. Other values are 'XML' and 'Tree'.
	 * If multiple display values are given a toolbar tab will be shown to switch display types.
	 */
	displayPanels: ['Grid'],

	/** api: config[infoFormat]
	 *  ``String``
	 *  Default GFI INFO_FORMAT parameter, may be overruled per Layer object infoFormat WMS param. If not set
	 *  the value ``application/vnd.ogc.gml`` will be used.
	 */
	infoFormat: 'application/vnd.ogc.gml',

	tabPanel : null,
	map		: null,
	displayPanel : null,
	lastEvt : null,
	olControl: null,
	tb: null,

	initComponent : function() {
		// For closures ("this" is not valid in callbacks)
		var self = this;

		Ext.apply(this, {
			layout		: "fit",
			title		: __('Feature Info')
		});

		this.display = this.displayGrid;

		// Handy structure to select dsiplay options for toolbar or just single Panel
		// based on configured "displays", e.g. displays = ['Grid', 'XML'] only shows
		// 2 tabs
		var displayOpts = {
			Grid : {
				Fun : this.displayGrid,
				Item : {
					text: __('Grid'),
					group: "featInfoGroup",
					checked: true,
					checkHandler: function(t) {
						self.display = self.displayGrid;
						self.handleGetFeatureInfo();
					}
				}
			},
			Tree : {
				Fun : this.displayTree,
				Item : {
					text: __('Tree'),
					group: "featInfoGroup",
					checked: false,
					checkHandler: function(t) {
						self.display = self.displayTree;
						self.handleGetFeatureInfo();
					}
				}
			},
			XML : {
				Fun : this.displayXML,
				Item : {
					text: __('XML'),
					group: "featInfoGroup",
					checked: false,
					checkHandler: function(t) {
						self.display = self.displayXML;
						self.handleGetFeatureInfo();
					}
				}
			}
		};

		// Configure display panel based on options configured
		// using the handy structure displayOpts
		var displayType;
		if (this.displayPanels.length == 1) {
			// Only one display type configured: no need for toolbar tabs
			displayType = this.displayPanels[0];
			if (displayOpts[displayType]) {
				this.display = displayOpts[displayType].Fun;
			}
		} else {
			// Multiple display types configured: add toolbar tabs
			var displayMenuItems = ['<b class="menu-title">' + __('Choose a Display Option') + '</b>'];
			for (var i = 0; i < this.displayPanels.length; i++) {
				displayType = this.displayPanels[i];
				if (displayOpts[displayType]) {
					displayMenuItems.push(displayOpts[displayType].Item);
				}
			}

			var displayMenu = new Ext.menu.Menu({
				id: 'displayMenu',
				style: {
					overflow: 'visible'	 // For the Combo popup
				},
				items: displayMenuItems
			});

			this.tb = new Ext.Toolbar();

			this.tb.add({
				text: __('Display'),
				cls: 'icon-table x-btn-text-icon',
				menu: displayMenu  // assign menu by instance
			});
		}

		if (this.exportFormats && this.exportFormats.length > 0) {
			// Multiple display types configured: add toolbar tabs
			var exportMenuItems = ['<b class="menu-title">' + __('Choose an Export Format') + '</b>'];
			for (var j = 0; j < this.exportFormats.length; j++) {
				var exportFormat = this.exportFormats[j];
				var item = {
					text: __('Export') + ' ' + exportFormat,
					exportFormat: exportFormat,
					gfiPanel: self,
					handler: self.exportData
				};
				exportMenuItems.push(item);
			}

			var exportMenu = new Ext.menu.Menu({
				id: 'exportMenu',
				style: {
					overflow: 'visible'	 // For the Combo popup
				},
				items: exportMenuItems
			});

			if (!this.tb) {
				this.tb = new Ext.Toolbar();
			}

			this.tb.add('->');
			this.tb.add({
				text: __('Export'),
				cls: 'icon-table-save x-btn-text-icon',
				menu: exportMenu  // assign menu by instance
			});

		}

		// Toolbar defined ?
		if (this.tb) {
			// Add toolbar tabs for different representations
			Ext.apply(this, {
						tbar: this.tb
					}
			);
		}

		Heron.widgets.FeatureInfoPanel.superclass.initComponent.call(this);
		this.map = Heron.App.getMap();

		/***
		 * Add a WMSGetFeatureInfo control to the map if it is not yet present
		 */
		var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
		if (controls && controls.length > 0) {
			this.olControl = controls[0];

			// Overrule with our own info format and max features
			this.olControl.infoFormat = this.infoFormat;
			this.olControl.maxFeatures = this.maxFeatures;
		}

		// No GFI control present: create new and add to Map
		if (!this.olControl) {
			this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures	: this.maxFeatures,
				queryVisible: true,
				infoFormat : this.infoFormat
			});

			this.map.addControl(this.olControl);
		}

		// Register interceptors
		this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
		this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);

		this.on(
				"render",
				function() {
					this.mask = new Ext.LoadMask(this.body, {msg:__('Loading...')})
				});
	},

	handleBeforeGetFeatureInfo : function(evt) {
		this.olControl.layers = [];

		// Needed to force accessing multiple WMS-es when multiple layers are visible
		this.olControl.url = null;
		this.olControl.drillDown = true;

		// Select WMS layers that are visible and enabled (via featureInfoFormat or Layer info_format (capitalized by OL) prop)
		var layer;
		for (var index = 0; index < this.map.layers.length; index++) {
			layer = this.map.layers[index];

			// Skip non-WMS layers
			if (!layer.params) {
				continue;
			}

			// Enable layers for GFI that have a GFI mime param specified
			if (layer.visibility && (layer.featureInfoFormat || layer.params.INFO_FORMAT)) {

				// Backward compatible with old configs that have only featureInfoFormat
				// set to a mime type like "text/xml". layer.params.INFO_FORMAT determines the mime
				// requested from WMS server.
				if (!layer.params.INFO_FORMAT && layer.featureInfoFormat) {
					layer.params.INFO_FORMAT = layer.featureInfoFormat;
				}
				this.olControl.layers.push(layer);
			}
		}

		// TODO this really should be done by subscribing to the "nogetfeatureinfo"  event
		// of OpenLayers.Control.WMSGetFeatureInfo
		if (this.olControl.layers.length == 0) {
			alert(__('Feature Info unavailable'));
			return;
		}

		this.lastEvt = null;
		this.expand();
		if (this.tabPanel != undefined) {
			this.tabPanel.removeAll();
		}

		// Show loading mask
		this.mask.show();
	},

	handleGetFeatureInfo : function(evt) {
		// Hide the loading mask
		this.mask.hide();

		// Save result e.g. when changing views
		if (evt) {
			this.lastEvt = evt;
		}

		if (!this.lastEvt) {
			return;
		}

		if (this.displayPanel) {
			this.remove(this.displayPanel);
		}

		// Delegate to current display panel (Grid, Tree, XML)
		this.displayPanel = this.display(this.lastEvt);

		if (this.displayPanel) {
			this.add(this.displayPanel);
			this.displayPanel.doLayout();
		}

		if (this.getLayout()) {
			this.getLayout().runLayout();
		}
	},

	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as grid)
	 */
	displayGrid : function(evt) {
		var types = new Array();
		var featureType;

		for (var index = 0; index < evt.features.length; index++) {
			var rec = evt.features[index];

			// Reset featureType
			featureType = null;

			// If GFI returned GML, OL has may have parsed out the featureType
			// http://code.google.com/p/geoext-viewer/issues/detail?id=92
			if (rec.gml && rec.gml.featureType) {
				featureType = rec.gml.featureType;
			}

			// GeoServer-specific
			if (!featureType && rec.fid && rec.fid.indexOf('undefined') < 0) {
				// TODO: this is nasty and GeoServer specific ?
				// We may check the FT e.g. from the GML tag(s) available in the evt
				// More specific, we need to. Because now with multiple layers, all are assigned to
				// unknown and you get strange column results when the featuretypes are mixed..
				featureType = /[^\.]*/.exec(rec.fid);

				featureType = (featureType[0] != "null") ? featureType[0] : null;
			}

			// ESRI-specific
			if (!featureType && rec.attributes['_LAYERID_']) {
				// Try ESRI WMS GFI returns layername/featureType as attribute '_LAYERID_'  !
				// See http://webhelp.esri.com/arcims/9.3/general/mergedprojects/wms_connect/wms_connector/get_featureinfo.htm
				// See e.g. http://svn.flamingo-mc.org/trac/changeset/648/flamingo/trunk/fmc/OGWMSConnector.as
				featureType = rec.attributes['_LAYERID_'];
			}

			// TNO/DINO-specific
			if (!featureType && rec.attributes['DINO_DBA.MAP_SDE_GWS_WELL_W_HEADS_VW.DINO_NR']) {
				// TODO find better way to determine and fix for DINO services
				//			var nodes = featureNode.childNodes;
				//			 var _featureType = "";
				//			 for (j = 0,jlen = nodes.length; j < jlen; ++j) {
				//				 var node = nodes[j];
				//				 if (node.nodeType !== 3) {
				//					 //Dirty fix for dino name needs to be stripped as it consists of 3 parts
				//					 var dino_name = node.getAttribute("name");
				//					 var _feat = dino_name.split(".");
				//					 if(_feat[0] === "DINO_DBA"){
				//						 attributes[_feat[2]] = node.getAttribute("value");
				//						 _featureType = _feat[1];
				//					 } else {
				//						 attributes[node.getAttribute("name")] = node.getAttribute("value");
				//					 }
				//				 }
				//			 }
				//		 }
				//		 _feature = new OpenLayers.Feature.Vector(geom, attributes, null);
				//
				//		 if(_featureType !== ""){
				//			 // Dirty fix for dino to maintain reference to layer
				//			 _feature.gml = {};
				//			 _feature.gml.featureType = _featureType;
				//			 _feature.fid = _featureType + "." + len;
				//			 _feature.layer = _featureType;
				//		 }
				//	var _feat = dino_name.split(".");
				//					 if(_feat[0] === "DINO_DBA"){
				//						 attributes[_feat[2]] = node.getAttribute("value");
				//						 _featureType = _feat[1];
				//					 } else {
				//						 attributes[node.getAttribute("name")] = node.getAttribute("value");
				//					 }
				// rec.attributes[0]
				featureType = 'TNO_DINO_WELLS';
			}
			// TNO/DINO-specific  (see above)
			if (!featureType && rec.attributes['DINO_DBA.MAP_SDE_BRH_BOREHOLE_RD_VW.DINO_NR']) {
				featureType = 'TNO_DINO_BOREHOLES';
			}

			if (!featureType) {
				featureType = __('Unknown');
			}

			var found = false;
			var type = null;

			for (var j = 0; j < types.length; j++) {
				type = types[j];

				if (type.featureType == featureType) {
					found = true;
				}
			}

			if (!found) {
				type = {
					featureType : featureType,
					columns		: new Array(),
					fields		: new Array(),
					records		: new Array()
				};

				types.push(type);
			}

			/***
			 * Go through attributes and modify where needed:
			 * - hyperlinks clickable
			 * - illegal field names (with dots)
			 * - custom hyperlinks
			 */
			var attrib;
			for (attrib in rec.attributes) {

				// Check for hyperlinks
				// Simple fix for issue 23
				// http://code.google.com/p/geoext-viewer/issues/detail?id=23
				var value = rec.attributes[attrib];
				if (value && value.indexOf("http://") >= 0) {
					// Display value as HTML hyperlink
					rec.attributes[attrib] = '<a href="' + value + '" target="_new">' + value + '</a>';
				}

				// GetFeatureInfo response may contain dots in the fieldnames, these are not allowed in ExtJS store fieldnames.
				// Use a regex to replace the dots /w underscores.
				if (attrib.indexOf(".") >= 0) {
					var new_attrib = attrib.replace(/\./g, "_");

					rec.attributes[new_attrib] = rec.attributes[attrib];

					if (attrib != new_attrib) {
						delete rec.attributes[attrib];
					}
				}
			}

			// Populate columns and fields arrays
			if (type.records.length == 0) {
				for (attrib in rec.attributes) {
					if (type.records.length == 0) {
						// New column
						type.columns.push({
							header : attrib,
							width : 100,
							dataIndex : attrib
						});


						type.fields.push(attrib);
					}
				}
			}


			type.records.push(rec.attributes);
		}

		// Remove any existing panel
		if (this.tabPanel != null) {
			this.remove(this.tabPanel);
			this.tabPanel = null;
		}

		// Run through FTs
		while (types.length > 0) {
			// TODO : Link typename to layer name
			type = types.pop();
			if (type.records.length > 0) {
				// Create the table grid
				var store = new Ext.data.JsonStore({
					autoDestroy : true,
					fields : type.fields,
					data : type.records
				});


				var grid = new Ext.grid.GridPanel({
					store : store,
					title : type.featureType,
					featureType : type.featureType,

					colModel: new Ext.grid.ColumnModel({
						defaults: {
							width: 120,
							sortable: true
						},
						columns : type.columns,
						autoScroll : true,
						listeners : {
							"render" : function(c) {
								c.doLayout();
							}
						}
					})
				});

				// Create tab panel for the first FT and add additional tabs for each FT
				if (this.tabPanel == null) {
					this.tabPanel = new Ext.TabPanel({
						border : false,
						autoDestroy : true,
						height : this.getHeight(),
						items : [grid],
						activeTab : 0
					});
				} else {
					// Add to existing tab panel
					this.tabPanel.add(grid);
					this.tabPanel.setActiveTab(0);
				}
			}
		}
		return this.tabPanel;
	},

	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as Tree)
	 */
	displayTree : function(evt) {
		var panel = new Heron.widgets.XMLTreePanel();

		panel.xmlTreeFromText(panel, evt.text);

		return panel;
	},

	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as XML)
	 */
	displayXML : function(evt) {
		var opts = {
			html: '<div class="hr-html-panel-body"><pre>' + Heron.Utils.formatXml(evt.text, true) + '</pre></div>',
			preventBodyReset: true,
			autoScroll: true
		};

		return new Ext.Panel(opts);
	},

	/***
	 * Callback handler function for exporting the data to specified format.
	 */
	exportData : function(evt) {
		var self = evt.gfiPanel;
		if (!self.tabPanel || !self.tabPanel.activeTab) {
			alert(__('No features available or none-grid display chosen'));
			return;
		}

		var featureType = self.tabPanel.activeTab.featureType;
		var store = self.tabPanel.activeTab.store;

		var exportConfig = {
			CSV:
			{
				formatter: 'CSVFormatter',
				fileName: featureType + '.csv',
				mimeType: 'text/csv'
			},
			Excel:
			{
				formatter: 'ExcelFormatter',
				fileName: featureType + '.xls',
				mimeType: 'application/vnd.ms-excel'
			}
		};
		var config = exportConfig[evt.exportFormat];
		if (!config) {
			alert(__('Invalid export format configured: '  + evt.exportFormat));
			return;
		}

		var data = Heron.data.DataExporter.formatStore(store, config, true);
		Heron.data.DataExporter.download(data, config)
	}

});

/** api: xtype = hr_featureinfopanel */
Ext.reg('hr_featureinfopanel', Heron.widgets.FeatureInfoPanel);
