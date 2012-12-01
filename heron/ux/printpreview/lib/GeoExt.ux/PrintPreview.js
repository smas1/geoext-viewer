/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

// Note - original from
// http://dev.geoext.org/geoext/trunk/geoext ... GeoExt.ux.PrintPreview.js
// http://dev.geoext.org/geoext/trunk/geoext ... GeoExt.ux.PrintSimple.js
//
// adapted and extended by: wolfram.winter@gmail.com
// Rev. 2012/11/15
//

Ext.namespace("GeoExt.ux");

/** api: (define)
 *  module = GeoExt.ux
 *  class = PrintPreview
 *  base_link = `Ext.Container <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Container>`_
 */

/** api: constructor
 *  .. class:: PrintPreview
 *
 *  A print preview with an interactive map. Requires a server-side print
 *  module configuration with two custom fields (by default ``mapTitle`` and
 *  ``comment``).
 */
GeoExt.ux.PrintPreview = Ext.extend(Ext.Container, {

    /* begin i18n */
    /** api: config[paperSizeText] ``String`` i18n */
    paperSizeText: "Paper size:",
    /** api: config[resolutionText] ``String`` i18n */
    resolutionText: "Resolution:",
    /** api: config[printText] ``String`` i18n */
    printText: "Print",
    /** api: config[emptyTitleText] ``String`` i18n */
    emptyTitleText: "Enter map title here.",
    /** api: config[emptyCommentText] ``String`` i18n */
    emptyCommentText: "Enter comments here.",
    /** api: config[emptyTitleText] ``String`` i18n */
    emptyFooterText: "Enter map footer here.",
    /** api: config[creatingPdfText] ``String`` i18n */
    creatingPdfText: "Creating PDF...",
	/** api: config[includeLegendText] ``String`` i18n */
 	includeLegendText: "Include legend?",
    /** api: config[rotationText] ``String`` i18n */
    rotationText: "Rotation",
    /* end i18n */

    /** api: config[printProvider]
     *  :class:`GeoExt.data.PrintProvider`|``Object`` Instance or
     *  configuration for the PrintProvider that this dialog will use. Not
     *  required if provided with the
     *  :ref:`GeoExt.ux.PrintPreview.printMapPanel`.
     */

    /** private: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider`
     */
    printProvider: null,

    /** api: config[sourceMap]
     *  :class:`GeoExt.MapPanel`|``OpenLayers.Map`` The map to copy layers and
     *  extent from for printing. Not required if provided with the
     *  :ref:`GeoExt.ux.PrintPreview.printMapPanel`.
     */

    /** private: property[sourceMap]
     *  ``OpenLayers.Map`` The map to copy layers and extent from for printing.
     */
    sourceMap: null,

    /** api: config[printMapPanel]
     *  :class:`GeoExt.PrintMapPanel`:``Object`` Optional. Useful e.g.
     *  for adding a ZoomSlider (via ``items``) or setting map options (like
     *  configuring custom controls or filtering out unsupported layers with
     *  a preaddlayer listener via ``map``).
     *
     *  .. note:: If provided as :class:`GeoExt.PrintMapPanel`, this has to be
     *       configured with ``printProvider`` and ``sourceMap``.
     */

    /** api: property[printMapPanel]
     *  class:`GeoExt.PrintMapPanel` The print preview map. Read-only.
     */
    printMapPanel: null,

    /** api: config[showTitle]
     *  ``Boolean`` If set to true, the 'mapTitleYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapTitleYAML' is given to the print service for the map title - if 'mapTitleYAML'
     *  is set to Null, this will disable the map title print output
     *  Default is true.
     */
    showTitle: true,

    /** api: config[mapTitle]
     *  ``String`` An optional title to set for the mapTitle field when
     *  creating the dialog.
     */
    mapTitle: null,

    /** api: config[mapTitleYAML]
     *  ``String`` The custom field of the print service for the map title
     *  Default is 'mapTitle'.
     */
    mapTitleYAML: "mapTitle",

    /** api: config[showComment]
     *  ``Boolean`` If set to true, the 'mapCommentYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapCommentYAML' is given to the print service for the map comment - if 'mapCommentYAML'
     *  is set to Null, this will disable the comment print output
     *  Default is true.
     */
    showComment: true,

    /** api: config[mapComment]
     *  ``String`` An optional comment to set for the comment field when
     *  creating the dialog.
     */
    mapComment: null,

    /** api: config[mapCommentYAML]
     *  ``String`` The custom field of the print service for the comment
     *  Default is 'mapComment'.
     */
    mapCommentYAML: "mapComment",

    /** api: config[showFooter]
     *  ``Boolean`` If set to true, the 'mapFooterYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapFooterYAML' is given to the print service for the map title - if 'mapFooterYAML'
     *  is set to Null, this will disable the map title print output
     *  Default is true.
     */
    showFooter: true,

    /** api: config[mapFooter]
     *  ``String`` An optional title to set for the mapFooter field when
     *  creating the dialog.
     */
    mapFooter: null,

    /** api: config[mapFooterYAML]
     *  ``String`` The custom field of the print service for the map footer
     *  Default is 'mapFooter'.
     */
    mapFooterYAML: "mapFooter",

    /** api: config[showLegend]
     *  ``Boolean`` If set to true, the 'legend' select box will be rendered.
     *  If set to false, the select box will not be rendered, but the contents of
     *  'legend' is given to the print service, if 'showLegendChecked' is set to true
     *  Default is true.
     */
    showLegend: true,

    /** api: config[legend]
     *  ref:`GeoExt.LegendPanel` The legend to include. If not provided, the
     *  dialog won't have an option to include the legend.
     */
    mapLegend: null,

    /** api: config[showLegendChecked]
     *  ``Boolean`` Initial status of the "Include legend?" checkbox. Will be
     *  ignored if :ref:`GeoExt.ux.PrintPreview.legend` is not provided.
     */
    showLegendChecked: false,

    /** api: config[showRotation]
     *  ``Boolean`` If set to true, the "Rotation" field will be rendered.
     *  Default is true.
     */
    showRotation: true,

    /** private: property[printRotationPage]
     *  :class:`GeoExt.data.PrintPage` The print page for this form. Useful
     *  e.g. for rotating handles when used in a style map context. Read-only.
     */
	printRotationPage: null,

    /** private: property[printRotationExtent]
     *  :class:`GeoExt.plugins.PrintExtent`
     */
    printRotationExtent: null,

    /** api: config[printRotationExtentOptions]
     *  ``Object`` Optional options for the `GeoExt.plugins.Print` plugin.
     */
    printRotationExtentOptions: null,

    /** api: config[addMapOverlay]
     *  ``Boolean`` Set to false if no map overlay with scale, scale selector
     *  and north arrow should be added. Default is true.
     */
    addMapOverlay: true,

    /** api: config[busyMask]
     *  ``Ext.LoadMask`` A LoadMask to use while the print document is
     *  prepared. Optional, will be auto-created with ``creatingPdfText` if
     *  not provided.
     */

    /** private: property[busyMask]
     *  ``Ext.LoadMask``
     */
    busyMask: null,

    /** private: property[form]
     *  ``Ext.form.FormPanel`` The form for this dialog.
     */
    form: null,

    /** private: property[autoEl]
     *  override
     */
    autoEl: "center",

    /** private: property[cls]
     *  override
     */
    cls: "x-panel-body x-panel-body-noheader",

    /** private: method[initComponent]
     */
    initComponent: function() {
        var printMapPanelOptions = {
            sourceMap: this.sourceMap,
            printProvider: this.printProvider
        };
        if(this.printMapPanel) {
            if(!(this.printMapPanel instanceof GeoExt.PrintMapPanel)) {
                printMapPanelOptions.xtype = "gx_printmappanel";
                this.printMapPanel = new GeoExt.PrintMapPanel(
                    Ext.applyIf(this.printMapPanel, printMapPanelOptions));
            }
        } else {
            this.printMapPanel = new GeoExt.PrintMapPanel(
                printMapPanelOptions);
        }
        this.sourceMap = this.printMapPanel.sourceMap;
        this.printProvider = this.printMapPanel.printProvider;

		if (this.showRotation) {
        	this.printRotationPage = new GeoExt.data.PrintPage({
				printProvider: this.printProvider
        	});
			this.printRotationExtent = new GeoExt.plugins.PrintExtent(Ext.applyIf({
				pages: [this.printRotationPage],
				layer: this.initialConfig.layer
			}, this.printRotationExtentOptions));
		}

        this.form = this.createForm();

        if (!this.items) {
            this.items = [];
        }
        this.items.push(this.createToolbar(), {
            xtype: "container",
            cls: "gx-printpreview",
            autoHeight: this.autoHeight,
            autoWidth: this.autoWidth,
            items: [
                this.form,
                this.printMapPanel
            ]
        });

        GeoExt.ux.PrintPreview.superclass.initComponent.call(this);

        this.addMapOverlay && this.printMapPanel.add(this.createMapOverlay());

		if (this.showRotation) {
			this.printMapPanel.initPlugin(this.printRotationExtent);
		}

        this.printMapPanel.on({
            "resize": this.updateSize,
            scope: this
        });
        this.on({
            "render": function() {
                if (!this.busyMask) {
                    this.busyMask = new Ext.LoadMask(this.getEl(), {
                        msg: this.creatingPdfText
                    });
                }
                this.printProvider.on({
                    "beforeprint": this.busyMask.show,
                    "print": this.busyMask.hide,
                    "printexception": this.busyMask.hide,
                    scope: this.busyMask
                });
            },
            scope: this
        });

    },

    /** private: method[createToolbar]
     *  :return: ``Ext.Toolbar``
     */
    createToolbar: function() {
        var items = [];
        this.printProvider.layouts.getCount() > 1 && items.push(this.paperSizeText, {
            xtype: "combo",
            width: 100,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            }),
            store: this.printProvider.layouts,
            displayField: "name",
            typeAhead: true,
            mode: "local",
            forceSelection: true,
            triggerAction: "all",
            selectOnFocus: true
        }, "&nbsp;");
        this.printProvider.dpis.getCount() > 1 && items.push(this.resolutionText, {
            xtype: "combo",
            width: 65,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            }),
            store: this.printProvider.dpis,
            displayField: "name",
            tpl: '<tpl for="."><div class="x-combo-list-item">{name} dpi</div></tpl>',
            typeAhead: true,
            mode: "local",
            forceSelection: true,
            triggerAction: "all",
            selectOnFocus: true,
            setValue: function(v){
                v = parseInt(v) + " dpi";
                Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
            }
        }, "&nbsp;");
        items.push("-");
        items.push("->", {
            text: "&nbsp;" + this.printText,
            iconCls: "icon-print",
            handler: function(){
            	if (!this.showRotation) {
                	this.printMapPanel.print(this.showLegendChecked && {legend: this.mapLegend});
                } else {
					this.printRotationExtent.print(this.showLegendChecked && {legend: this.mapLegend});
				}
            },
            scope: this
        });
        return {
            xtype: "toolbar",
            enableOverflow: true,
            items: items
        };
    },

    /** private: method[createForm]
     *  :return: ``Ext.form.FormPanel``
     */
    createForm: function() {
        var titleCfg = {
            xtype: "textfield",
            name: this.mapTitleYAML,
            value: this.mapTitle,
            emptyText: this.emptyTitleText,
            hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showTitle,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        var commentCfg = {
			xtype: "textarea",
			name: this.mapCommentYAML,
			value: this.mapComment,
			emptyText: this.emptyCommentText,
			hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showComment,
			plugins: new GeoExt.plugins.PrintProviderField({
				printProvider: this.printProvider
			})
		};

        var footerCfg = {
            xtype: "textfield",
            name: this.mapFooterYAML,
            value: this.mapFooter,
            emptyText: this.emptyFooterText,
            hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showFooter,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        if(this.mapLegend) {
            var legendCheckbox = new Ext.form.Checkbox({
                name: "mapLegend",
                checked: this.showLegendChecked,
                boxLabel: this.includeLegendText,
                hideLabel: true,
                ctCls: "gx-item-nowrap",
            	hidden: !this.showLegend,
                handler: function(cb, checked) {
                    this.showLegendChecked = checked;
                },
                scope: this
            });
        }

		if (this.showRotation) {
			var rotationNum = {
	           	xtype: "numberfield",
	           	name: "rotation",
				value: 0,
				hideLabel: true,
				width: 40,
				allowBlank: false,
				allowNegative: false,
				allowDecimals: false,
				decimalPrecision: 0,
				minValue: -360,
				maxValue: 360,
            	enableKeyEvents: true,
				plugins: new GeoExt.plugins.PrintPageField({
					printPage: this.printRotationPage
				})
			}
		}

        return new Ext.form.FormPanel({
            autoHeight: true,
            border: false,
            defaults: {
                anchor: "100%"
            },
            items: [
					titleCfg,
					commentCfg,
					footerCfg,
					((this.mapLegend) || (this.showRotation)) ? {
						xtype: "container",
						layout: "hbox",
						anchor: "100%",
						cls: "x-form-item",
						items: [
							(this.showRotation) ? {
								xtype: 'label',
								html: this.rotationText + ":",
								margins: "3 5 0 0"
							} : {xtype: 'label', html: '&nbsp;', hidden: true}
							,
							(this.showRotation) ? rotationNum : {xtype: 'label', html: '&nbsp;', hidden: true},
							{xtype: 'label', html: '', flex: 1},
							(this.mapLegend) ? legendCheckbox : {xtype: 'label', html: '&nbsp;', hidden: true}
						]
					} : {xtype: 'label', html: '&nbsp;', hidden: true}
            	]
        });
    },

    /** private: method[createMapOverlay]
     *  :return: ``Ext.Panel``
     */
    createMapOverlay: function() {
        var map = this.printMapPanel.map;
        var scaleLine = new OpenLayers.Control.ScaleLine({
            geodesic: !(map.getProjectionObject() || new OpenLayers.Projection(map.projection || "EPSG:4326")).equals("EPSG:4326")
        });
        map.addControl(scaleLine);
        scaleLine.activate();
        return new Ext.Panel({
            cls: "gx-map-overlay",
            layout: "column",
            width: 235,
            bodyStyle: "padding:5px",
            items: [{
                xtype: "box",
                el: scaleLine.div,
                width: scaleLine.maxWidth
            }, {
                xtype: "container",
                layout: "form",
                style: "padding: .2em 5px 0 0;",
                columnWidth: 1,
                cls: "x-small-editor x-form-item",
                items: {
                    xtype: "combo",
                    name: "scale",
                    anchor: "100%",
                    hideLabel: true,
                    store: this.printMapPanel.previewScales,
                    displayField: "name",
                    typeAhead: true,
                    mode: "local",
                    forceSelection: true,
                    triggerAction: "all",
                    selectOnFocus: true,
                    getListParent: function() {
                        return this.el.up(".x-window") || document.body;
                    },
					plugins: (!this.showRotation) ?
								new GeoExt.plugins.PrintPageField({
									printPage: this.printMapPanel.printPage
								})
								:
								new GeoExt.plugins.PrintPageField({
                					printPage: this.printRotationPage
								})
                }
            }, {
                xtype: "box",
                autoEl: {
                    tag: "div",
                    cls: "gx-northarrow"
                }
            }],
            listeners: {
                "render": function() {
                    function stop(evt){evt.stopPropagation();}
                    this.getEl().on({
                        "click": stop,
                        "dblclick": stop,
                        "mousedown": stop
                    });
                }
            }
        });
    },

    /** private: method[updateSize]
     *  sync the form's width with the map with, and make sure that the window
     *  shadow is updated if this dialog is added to an ``Ext.Window``
     */
    updateSize: function() {
        this.suspendEvents();
        var mapWidth = this.printMapPanel.getWidth();
        // sync form and toolbar width with map width
        this.form.setWidth(mapWidth);
        // the line with title and legend needs an extra invitation
        this.form.items.get(0).setWidth(mapWidth);
        var minWidth = this.initialConfig.minWidth || 0;
        this.items.get(0).setWidth(
            this.form.ownerCt.el.getPadding("lr") + Math.max(mapWidth, minWidth)
        );
        // shadow does not sync, so do it manually
        var parent = this.ownerCt;
        if (parent && parent instanceof Ext.Window) {
            this.ownerCt.syncShadow();
        }
        this.resumeEvents();
    },

    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        if (this.busyMask) {
            this.printProvider.un("beforeprint", this.busyMask.show, this.busyMask);
            this.printProvider.un("print", this.busyMask.hide, this.busyMask);
        }
        this.printMapPanel.un("resize", this.updateSize, this);
        GeoExt.ux.PrintPreview.superclass.beforeDestroy.apply(this, arguments);
    }

});

/** api: xtype = gxux_printpreview */
Ext.reg("gxux_printpreview", GeoExt.ux.PrintPreview);
