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
Ext.namespace("Heron");
Ext.namespace("Heron.options");

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://dev.sencha.com/deploy/ext-3.3.1/docs
 *
 **/
Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel',
					hropts: Heron.options.layertree
				},

				{
					xtype: 'hr_htmlpanel',
					id: 'hr-info-west',
					html: '<div class="hr-html-panel-body"><p>This is the Heron Mapping Client.' +
							'</p><br/><p>This viewer and in fact the entire website has been made with the Open Source' +
							' project <a href="http://heron-mc.org" target="_new" >Heron Mapping Client</a>. This on ' +
							'<a href="http://geoext.org">GeoExt</a>-based Viewer is very flexible and extensible ' +
							'See examples like <a href="http://inspire.kademo.nl" target="_new">Heron MC for Kademo INSPIRE</a>.</p><br/></div>',
					preventBodyReset: true,
					title: 'Info'
				},
				{
					xtype: 'hr_contextbrowserpanel',
					id: 'hr-contextbrowser',
					/** The contexts to create shortcuts in the context browser. */
					hropts: Heron.options.contextbrowser
				}
			]

		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: Heron.options.map
				},
				{
					xtype: 'hr_featureinfopanel',
					id: 'hr-feature-info',
					region: "south",
					border: true,
					collapsible: true,
					collapsed: true,
					height: 205,
					split: true,
					maxFeatures: 10
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-menu-right-container',
			layout: 'accordion',
			region : "east",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layerlegendpanel',

					hropts: {
						// Preload Legends on initial startup
						// Will fire WMS GetLegendGraphic's for WMS Legends
						// Otherwise Legends will be loaded only when Layer
						// becomes visible. Default: false
						prefetchLegends: false
					}
				}
			]

		}

	]
};