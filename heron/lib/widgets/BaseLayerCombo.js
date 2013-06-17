/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

// Note original from
// http://www.webmapcenter.de/geoext-baselayer-combo/GeoExt.ux.BaseLayerCombobox.js
// adapted for Heron with general LayerCombo class, namespacing and I18N
// Ext.ns('GeoExt.ux');

Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = BaseLayerCombo
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.4.0/docs/?class=Ext.form.ComboBox>`_
 */

/**
 *
 * A combo box in order to switch the base layers of a given map
 *
 *
 * @constructor
 * @extends Heron.widgets.LayerCombo
 *
 */
Heron.widgets.BaseLayerCombo = Ext.extend(Heron.widgets.LayerCombo, {

	/** api: config[map]
	 *  ``OpenLayers.Map or Object``  A configured map or a configuration object
	 *  for the map constructor, required only if :attr:`zoom` is set to
	 *  value greater than or equal to 0.
	 */
	/** private: property[map]
	 *  ``OpenLayers.Map``  The map object.
	 */
	map: null,

	/** api: config[store]
	 *  ``GeoExt.data.LayerStore`` A configured LayerStore
	 */
	/** private: property[store]
	 *  ``GeoExt.data.LayerStore``  The layer store of the map.
	 */
	store: null,

	/** api: config[emptyText]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/TextField.html#cfg-Ext.form.TextField-emptyText,
	 *  default value is "Choose a Base Layer".
	 */
	emptyText: __('Choose a Base Layer'),

	/** api: config[tooltip]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/TextField.html#cfg-Ext.form.TextField-emptyText,
	 *  default value is "Basemaps".
	 */
	tooltip: __('BaseMaps'),

	/** api: config[zoom]
	 *  ``Number`` Zoom level for recentering the map after search, if set to
	 *  a negative number the map isn't recentered, defaults to 8.
	 */
	/** private: property[zoom]
	 *  ``Number``
	 */
	zoom: 8,

	/** private: property[layerFilter]
	 *  layerFilter - function that takes subset of all layers, e.g. all visible or baselayers
	 */
	layerFilter: function (map) {
		return map.getLayersBy('isBaseLayer', true);
	},

	/** private: property[hideTrigger]
	 *  Hide trigger of the combo.
	 */
	hideTrigger: false,

	/** private: property[displayField]
	 *  Display field name
	 */
	displayField: 'name',

	/** private: property[forceSelection]
	 *  Force selection.
	 */
	forceSelection: true,

	/** private: property[triggerAction]
	 *  trigger Action
	 */
	triggerAction: 'all',

	/** private: property[mode]
	 *  mode
	 */
	mode: 'local',

	/** private: constructor
	 */
	initComponent: function () {
        var width = this.width;

		if (this.initialConfig.map !== null && this.initialConfig.map instanceof OpenLayers.Map && this.initialConfig.map.allOverlays === false) {

			this.map = this.initialConfig.map;

			// set the selectlayer (from LayerCombo) event handler
			this.on('selectlayer', function (layer) {
				//record.getLayer(idx).setVisibility(true);
				this.map.setBaseLayer(layer);
			}, this);

			// register event if base layer changes
			this.map.events.register('changebaselayer', this, function (obj) {
				this.setValue(obj.layer.name);
			});

			// Will be set by LayerCombo
			this.initialValue = this.map.baseLayer.name;
		}

		Heron.widgets.BaseLayerCombo.superclass.initComponent.apply(this, arguments);
	}

});

/** api: xtype = hr_baselayer_combobox */
Ext.reg('hr_baselayer_combobox', Heron.widgets.BaseLayerCombo);
