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

/** api: example[multisearchcenter]
 *  Choose from multiple Searches
 *  -----------------------------
 *  Select a search from a list of predefined form- or spatial queries or your own queries.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 4;
Heron.options.map.settings.center = '-98,40';
Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
    xtype: 'hr_multisearchcenterpanel',
    height: 600,
    hropts: [
        {
            searchPanel: {
                xtype: 'hr_formsearchpanel',
                name: 'Attribute (Form) Search: USA States',
                header: false,
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: "http://suite.opengeo.org/geoserver/ows?",
                    srsName: "EPSG:4326",
                    featureType: "states",
                    featureNS: "http://usa.opengeo.org"
                }),
                items: [
                    {
                        xtype: "textfield",
                        name: "STATE_NAME__like",
                        value: 'ah',
                        fieldLabel: "  name"
                    },
                    {
                        xtype: "label",
                        id: "helplabel",
                        html: 'Type name of a USA state, wildcards are appended and match is case-insensitive.<br/>Almost any single letter will yield results.<br/>',
                        style: {
                            fontSize: '10px',
                            color: '#AAAAAA'
                        }
                    }
                ],
                hropts: {
                    onSearchCompleteZoom: 10,
                    autoWildCardAttach: true,
                    caseInsensitiveMatch: true,
                    logicalOperator: OpenLayers.Filter.Logical.AND
                }
            },
            resultPanel: {
                 xtype: 'hr_featuregridpanel',
                 id: 'hr-featuregridpanel',
                 header: false,
                 autoConfig: true,
                 hropts: {
                     zoomOnRowDoubleClick: true,
                     zoomOnFeatureSelect: false,
                     zoomLevelPointSelect: 8,
                     zoomToDataExtent: false
                 }
             }
        },
        {
            searchPanel: {
                xtype: 'hr_spatialsearchpanel',
                name: __('Spatial Search'),
                header: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                selectFirst: true

            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_spatialsearchpanel',
                name: __('Spatial Search: with last result geometries'),
                description: 'This search uses the feature-geometries of the last result to construct and perform a spatial search.',
                header: false,
                border: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                hropts: {
                    fromLastResult: true,
                    maxFilterGeometries: 50,
                    selectFirst: false
                }
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_gxpquerypanel',
                name: __('Spatial and Attributes: build your own queries'),
                description: 'This search uses both search within Map extent and/or your own attribute criteria',
                header: false,
                border: false
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: true
                }
            }
        }
    ]
};

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {max_features: 20}},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: true,

            searchWindow: {
                title: __('Multiple Searches'),
                x: 100,
                y: undefined,
                width: 360,
                height: 440,
                items: [
                    Heron.examples.searchPanelConfig
                ]
            }
        }
    }
];
