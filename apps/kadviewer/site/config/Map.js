/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "scratch" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.PDOK");

/** Use these in  services where the server has less resolutions than the Map, OL will "blowup" lower resolutions */
Heron.options.serverResolutions = {
    zoom_0_12: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840],
    zoom_0_13: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    zoom_0_14: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
    zoom_0_15: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
    zoom_0_16: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525]
};

/**
 * Standard tiling "richtlijn" Netherlands:
 * upperleft: X=-285.401,920 Y=903.401,920;
 * lowerright: X=595.401,920 Y=22.598,080;
 * lowerleft: X=-285.401,920  Y=22.598,080;
 * This results in:
 * maxExtent: '-285401.920,22598.080,595401.920,903401.920'
 * on zoomLevel 2 more common for NL:
 * maxExtent: '-65200.96,242799.04,375200.96,683200.96',
 * but when using TMS all levels needed
 * scales:
 - 750
 - 1500
 - 3000
 - 6000
 - 12000
 - 24000
 - 48000
 - 96000
 - 192000
 - 384000
 - 768000
 - 1536000
 - 3072000
 - 6144000
 - 12288000
 * PDOK (follows tiling standard NL):
 *     baseURL: 'http://geodata.nationaalgeoregister.nl',
 *     TMS: 'http://geodata.nationaalgeoregister.nl/tms/',
 *     WMTS:  'http://geodata.nationaalgeoregister.nl/tiles/service/wmts',
 *     tileOriginLL: new OpenLayers.LonLat(-285401.920, 22598.080),
 *     tileOriginUL: new OpenLayers.LonLat(-285401.920, 903401.920),
 *     tileFullExtent:    new OpenLayers.Bounds(-285401.920, 22598.080, 595401.920, 903401.920),
 *     serverResolutions : [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
 */

Heron.options.map.settings = {
    projection: 'EPSG:28992',
    units: 'm',
    /** Using the PDOK/Geonovum NL Tiling rec. */
    resolutions: Heron.options.serverResolutions.zoom_0_16,
    maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',

//	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
//	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
    center: '155000,463000',
    xy_precision: 3,
    zoom: 4,
    allOverlays: true,
    theme: null,
    fractionalZoom: false,

    /**
     * Useful to always have permalinks enabled. default is enabled with these settings.
     * MapPanel.getPermalink() returns current permalink
     *
     **/
    permalinks: {
        /** The prefix to be used for parameters, e.g. map_x, default is 'map' */
        paramPrefix: 'map',
        /** Encodes values of permalink parameters ? default false*/
        encodeType: false,
        /** Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks */
        prettyLayerNames: true
    },

    controls: [
        new OpenLayers.Control.Attribution(),
        new OpenLayers.Control.ZoomBox(),
        new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
        new OpenLayers.Control.LoadingPanel(),
        new OpenLayers.Control.PanPanel(),
        new OpenLayers.Control.ZoomPanel(),

        /*,				new OpenLayers.Control.OverviewMap() */
//        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.ScaleLine({bottomOutUnits: '', geodesic: true, maxWidth: 200})
    ]
    /** You can always control which controls are to be added to the map. */
    /* controls : [
     new OpenLayers.Control.Attribution(),
     new OpenLayers.Control.ZoomBox(),
     new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
     new OpenLayers.Control.LoadingPanel(),
     new OpenLayers.Control.PanPanel(),
     new OpenLayers.Control.ZoomPanel(),
     new OpenLayers.Control.OverviewMap(),
     new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})
     ] */
};


// Scratch object, just to keep list of URLs for reuse
Ext.namespace("Heron.scratch");
Heron.scratch.urls = {
    PDOK: 'http://geodata.nationaalgeoregister.nl',
    KADEMO_WFS: 'http://kademo.nl/gs2/wfs?',
    KADEMO_OWS: 'http://kademo.nl/gs2/ows?',
    KADEMO_GWC_TMS: 'http://kademo.nl/gwc/service/tms/',
    OPENBASISKAART_TMS: 'http://openbasiskaart.nl/mapcache/tms/',
    RO_WMS: 'http://afnemers.ruimtelijkeplannen.nl/afnemers/services?',
    UVA_SARA_BONNE: 'http://mapserver.sara.nl/topo/maps/bonne/bonne.php?',
    UVA_SARA_TMK: 'http://mapserver.sara.nl/topo/maps/tmk/tmk.php?'
};

Heron.PDOK.urls = {
    ADRESSEN: Heron.scratch.urls.PDOK + '/inspireadressen/ows?',
    BAGVIEWER: Heron.scratch.urls.PDOK + '/bagviewer/ows?',
    BESCHERMDENATUURMONUMENTEN: Heron.scratch.urls.PDOK + '/beschermdenatuurmonumenten/wms?',
    BESTUURLIJKEGRENZEN: Heron.scratch.urls.PDOK + '/bestuurlijkegrenzen/ows?',
    PDOKTMS: Heron.scratch.urls.PDOK + '/tms/',
    NATURA2000: Heron.scratch.urls.PDOK + '/natura2000/wms?',
    NATURA2000WMTS: Heron.scratch.urls.PDOK + '/tiles/service/wmts/natura2000?',
    NWBWEGEN: Heron.scratch.urls.PDOK + '/nwbwegen/wms?',
    NWBVAARWEGEN: Heron.scratch.urls.PDOK + '/nwbvaarwegen/wms?',
    NWBSPOORWEGEN: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wms?',
    NWBSPOORWEGENWFS: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wfs?',
    DTB: Heron.scratch.urls.PDOK + '/digitaaltopografischbestand/wms?',
    NATIONALEPARKEN: Heron.scratch.urls.PDOK + '/nationaleparken/wms?',
    WETLANDS: Heron.scratch.urls.PDOK + '/wetlands/wms?',
    NHI: Heron.scratch.urls.PDOK + '/nhi/wms?',
    AHN1: Heron.scratch.urls.PDOK + '/ahn25m/wms?',
    AHN2: Heron.scratch.urls.PDOK + '/ahn2/wms?',
    NOK: Heron.scratch.urls.PDOK + '/nok2010/wms?',
    VIN: Heron.scratch.urls.PDOK + '/vin/wms?',
    WEGGEG: Heron.scratch.urls.PDOK + '/weggeg/wms?',
    TOP10NL: Heron.scratch.urls.PDOK + '/top10nl/wms?',
    TOP10NLWMTS: Heron.scratch.urls.PDOK + '/tiles/service/wmts/top10nl?',
    TOP250RASTER: Heron.scratch.urls.PDOK + '/top250raster/wms?',
    TOP50RASTER: Heron.scratch.urls.PDOK + '/top50raster/wms?',
    TOP50VECTOR: Heron.scratch.urls.PDOK + '/top50vector/wms?',
    CULTGIS: Heron.scratch.urls.PDOK + '/cultgis/wms?',
    NOK2011: Heron.scratch.urls.PDOK + '/nok2011/wms?',
    BESTANDBODEMGEBRUIK2008: Heron.scratch.urls.PDOK + '/bestandbodemgebruik2008/wms?',
    BEVOLKINGSKERNEN2008: Heron.scratch.urls.PDOK + '/bevolkingskernen2008/wms?',
    AAN: Heron.scratch.urls.PDOK + '/aan/wms?',
    WIJKENBUURTEN2011: Heron.scratch.urls.PDOK + '/wijkenbuurten2011/wms?',
    WIJKENBUURTEN2010: Heron.scratch.urls.PDOK + '/wijkenbuurten2010/wms?',
    WIJKENBUURTEN2009: Heron.scratch.urls.PDOK + '/wijkenbuurten2009/wms?',
    CBSVIERKANTEN100m2010: Heron.scratch.urls.PDOK + '/cbsvierkanten100m2010/wms?',
    NOK2007: Heron.scratch.urls.PDOK + '/nok2007/wms?',
    LAWROUTES: Heron.scratch.urls.PDOK + '/lawroutes/wms?',
    LFROUTES: Heron.scratch.urls.PDOK + '/lfroutes/wms?',
    RDINFO: Heron.scratch.urls.PDOK + '/rdinfo/wms?',
    STREEKPADEN: Heron.scratch.urls.PDOK + '/streekpaden/wms?'
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'GML (version 2.1.2)',
        outputFormat: 'text/xml; subtype=gml/2.1.2',
        fileExt: '.gml'
    },
    {
        name: 'ESRI Shapefile (zipped)',
        outputFormat: 'SHAPE-ZIP',
        fileExt: '.zip'
    },
    {
        name: 'GeoJSON',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

/* Vector layers voor interactiviteit */
Ext.namespace("Heron.options.worklayers");
Heron.options.worklayers = {
    editor: new OpenLayers.Layer.Vector('Tekenlaag', {
        displayInLayerSwitcher: true, visibility: false, customStyling: true
    }),


    scratch: new OpenLayers.Layer.Vector('Kladlaag', {
        displayInLayerSwitcher: true, visibility: false
    })
};


/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */

    new OpenLayers.Layer.TMS("OpenTopo (opentopo.nl)",
        'http://ws.nlextract.nl/gwc/service/tms/',
        {
            layername: 'opentopo@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_16,
            alpha: true,
            opacity: 1.0,
            attribution: "CC by CA <a href='http://opentopo.nl'>OpenTopo</a>",
            transitionEffect: 'resize',
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/legenda-opentopo-1012.png',
                    hideInLegend: false
                }
            }
        }),

    new OpenLayers.Layer.TMS("OpenTopo14R11 TMS (GeoServer WMS)",
        'http://ws.nlextract.nl/srv/tms/',
        {
            layername: 'opentopo/EPSG28992',
            type: "png",
            isBaseLayer: true,
            transparent: false,
            bgcolor: "0xffffff",
            visibility: true,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_16,
            alpha: true,
            opacity: 1.0,
            attribution: "CC by CA <a href='http://opentopo.nl'>OpenTopo</a>",
            transitionEffect: 'resize',
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/legenda-opentopo-1012.png',
                    hideInLegend: false
                }
            }
        }),


    new OpenLayers.Layer.TMS("OpenTopo14R11 TMS (MapServer WMS)",
        'http://ws.nlextract.nl/srv/tms/',
        {
            layername: 'opentopo_ms/EPSG28992',
            type: "png",
            isBaseLayer: true,
            transparent: false,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_16,
            alpha: true,
            opacity: 1.0,
            attribution: "CC by CA <a href='http://opentopo.nl'>OpenTopo</a>",
            transitionEffect: 'resize',
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/legenda-opentopo-1012.png',
                    hideInLegend: false
                }
            }
        }),

    new OpenLayers.Layer.WMS(
        "OpenTopo14R11 (opentopo.nl)",
        'http://kademo.nl/gs2/nlextract/wms?',
        {
            layers: "nlextract:opentopo-2014r11",
            format: "image/png",
            transparent: false,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "OpenTopo14R11 37.5",
        'http://kademo.nl/gs2/nlextract/wms?',
        {
            layers: "nlextract:opentopo-37_5-2014r11",
            format: "image/png",
            transparent: false,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "OpenTopo14R11 200",
        'http://kademo.nl/gs2/nlextract/wms?',
        {
            layers: "nlextract:opentopo-200-2014r11",
            format: "image/png",
            transparent: false,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

     new OpenLayers.Layer.WMS(
        "OpenTopo14R11 400",
        'http://kademo.nl/gs2/nlextract/wms?',
        {
            layers: "nlextract:opentopo-400-2014r11",
            format: "image/png",
            transparent: false,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "OpenTopo14R11 800",
        'http://kademo.nl/gs2/nlextract/wms?',
        {
            layers: "nlextract:opentopo-800-2014r11",
            format: "image/png",
            transparent: false,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
         "OpenTopo14R11 1600",
         'http://kademo.nl/gs2/nlextract/wms?',
         {
             layers: "nlextract:opentopo-1600-2014r11",
             format: "image/png",
             transparent: false,
             info_format: 'application/vnd.ogc.gml'
         },
         {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
     ),

    new OpenLayers.Layer.TMS("BRT Achtergrondkaart",
        Heron.PDOK.urls.PDOKTMS,
        {
            layername: 'brtachtergrondkaart',
            type: "png",
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            alpha: true,
            opacity: 1.0,
            attribution: "Bron: <a href='https://www.pdok.nl/nl/service/wmts-brt-achtergrondkaart'>BRT Achtergrondkaart</a> en <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://www.openstreetmap.org/copyright'>ODbL</a>",
            transitionEffect: 'resize'
        }),

    new OpenLayers.Layer.TMS("OpenBasisKaart OSM",
        Heron.scratch.urls.OPENBASISKAART_TMS,
        {
            layername: 'osm@rd',
            type: "png",
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            alpha: true,
            opacity: 1.0,
            attribution: "(C) <a href='http://openbasiskaart.nl'>OpenBasisKaart</a><br/>Data <a href='http://www.openstreetmap.org/copyright'>ODbL</a> <a href='http://openstreetmap.org/'>OpenStreetMap</a> ",
            transitionEffect: 'resize'
        }),


    /*
     * Combinatie top250/50/25
     * http://kademo.nl/gwc/service/tms/1.0.0/top_raster@nlGridSetPDOK@png
     */
    new OpenLayers.Layer.TMS(
        "TopRaster",
        Heron.scratch.urls.KADEMO_GWC_TMS,
        {
            layername: 'top_raster@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            alpha: true, opacity: 1.0,
            transitionEffect: 'resize',
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/legenda-t25raster.png',
                    hideInLegend: false
                }
            }
        }),

    /*
     * Areal images PDOK.
     */
    new OpenLayers.Layer.TMS(
        "Luchtfoto (PDOK)",
        'http://geodata1.nationaalgeoregister.nl/luchtfoto/tms/',
        {
            layername: 'luchtfoto_EPSG28992',
            type: 'jpeg',
            serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            isBaseLayer: false,
            visibility: false
        }
    ),

    new OpenLayers.Layer.Image(
        "Blanco",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {
            resolutions: Heron.options.map.settings.resolutions,
            isBaseLayer: true,
            visibility: false,
            displayInLayerSwitcher: true,
            transitionEffect: 'resize'
        }
    ),

/** OVERLAYS **/

    /*
     * PDOK: BAG Adressen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Adressen",
        Heron.PDOK.urls.ADRESSEN,
        {layers: "inspireadressen", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'inspireadressen',
                    featureNS: 'http://inspireadressen.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Panden",
        Heron.PDOK.urls.BAGVIEWER,
        {layers: "pand", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'pand',
                    featureNS: 'http://bagviewer.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),
    new OpenLayers.Layer.Vector("BAG - Panden (WFS)", {
        maxResolution: 0.84,
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.8}),
        protocol: new OpenLayers.Protocol.WFS({
            url: Heron.PDOK.urls.BAGVIEWER,
            featureType: "pand",
            featureNS: "http://bagviewer.geonovum.nl",
            geometryName: 'geometrie'
        })
    }),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Verblijfsobjecten",
        Heron.PDOK.urls.BAGVIEWER,
        {layers: "verblijfsobject", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'verblijfsobject',
                    featureNS: 'http://bagviewer.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Ligplaatsen",
        Heron.PDOK.urls.BAGVIEWER,
        {layers: "ligplaats", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'ligplaats',
                    featureNS: 'http://bagviewer.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Standplaatsen",
        Heron.PDOK.urls.BAGVIEWER,
        {layers: "standplaats", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'standplaats',
                    featureNS: 'http://bagviewer.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
        "BAG - Woonplaatsen",
        Heron.PDOK.urls.BAGVIEWER,
        {layers: "woonplaats", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'woonplaats',
                    featureNS: 'http://bagviewer.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /*
     * PDOK: Bestuurlijke Grenzen  WMS
     */
    new OpenLayers.Layer.WMS(
        "Bestuurlijke Grenzen - Gemeenten",
        Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
        {layers: "gemeenten", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    new OpenLayers.Layer.WMS(
        "Bestuurlijke Grenzen - Provincies",
        Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
        {layers: "provincies", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    new OpenLayers.Layer.WMS(
        "Bestuurlijke Grenzen - Land",
        Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
        {layers: "landsgrens", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    /*
     * PDOK: Bestuurlijke Grenzen  WFS
     */
    new OpenLayers.Layer.Vector("Bestuurlijke Grenzen - Gemeenten (WFS)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.6}),
        protocol: new OpenLayers.Protocol.WFS({
            version: '1.1.0',
            outputFormat: 'GML2',
            srsName: 'EPSG:28992',
            url: Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            featureType: "gemeenten",
            featureNS: "http://bestuurlijkegrenzen.geonovum.nl",
            geometryName: 'geom'
        })
    }),

    new OpenLayers.Layer.Vector("Bestuurlijke Grenzen - Provincies (WFS)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#CC66FF', 'fillColor': '#CC66FF', graphicZIndex: 1, fillOpacity: 0.6}),
        protocol: new OpenLayers.Protocol.WFS({
            version: '1.1.0',
            outputFormat: 'GML2',
            srsName: 'EPSG:28992',
            url: Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            featureType: "provincies",
            featureNS: "http://bestuurlijkegrenzen.geonovum.nl",
            geometryName: 'geom'
        })
    }),

    new OpenLayers.Layer.Vector("Bestuurlijke Grenzen - Land (WFS)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#FF9900', 'fillColor': '#FF9900', graphicZIndex: 1, fillOpacity: 0.6}),
        protocol: new OpenLayers.Protocol.WFS({
            version: '1.1.0',
            outputFormat: 'GML2',
            srsName: 'EPSG:28992',
            url: Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            featureType: "landsgrens",
            featureNS: "http://bestuurlijkegrenzen.geonovum.nl",
            geometryName: 'geom'
        })
    }),


    /*
     * PDOK: NWB Wegen
     */
    new OpenLayers.Layer.WMS(
        "NWB - Wegen",
        Heron.PDOK.urls.NWBWEGEN,
        {layers: "wegvakken", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'nwbwegen',
                    featureNS: 'http://nwbwegen.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 10000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),
/**
 * PDOK: Digitaal Topografisch Bestand
 */
    new OpenLayers.Layer.WMS(
        "DTB Vlakken",
        Heron.PDOK.urls.DTB,
        {layers: 'vlakken', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "DTB Lijnen",
        Heron.PDOK.urls.DTB,
        {layers: 'lijnen', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "DTB Punten",
        Heron.PDOK.urls.DTB,
        {layers: 'punten', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "AHN 25m",
        Heron.PDOK.urls.AHN1,
        {layers: 'ahn25m', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

/** AHN2 - 5 lagen  - sinds 5 maart 2014 */
    new OpenLayers.Layer.WMS(
        "AHN2 0.5m Ruw",
        Heron.PDOK.urls.AHN2,
        {layers: 'ahn2_05m_ruw', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, maxResolution: 108}
    ),

    new OpenLayers.Layer.WMS(
        "AHN2 0.5m Geinterpoleerd",
        Heron.PDOK.urls.AHN2,
        {layers: 'ahn2_05m_int', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, maxResolution: 108}
    ),

    new OpenLayers.Layer.WMS(
        "AHN2 0.5m Niet Geinterpoleerd",
        Heron.PDOK.urls.AHN2,
        {layers: 'ahn2_05m_non', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, maxResolution: 108}
    ),

    new OpenLayers.Layer.WMS(
        "AHN2 5m",
        Heron.PDOK.urls.AHN2,
        {layers: 'ahn2_5m', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "AHN2 Bladindex",
        Heron.PDOK.urls.AHN2,
        {layers: 'ahn2_bladindex', format: "image/png", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),


    /*
     * PDOK: Lange Afstands Wandelpaden
     */
    new OpenLayers.Layer.WMS(
        "Lange Afstands Wandelroutes",
        Heron.PDOK.urls.LAWROUTES,
        {layers: "lawroutes", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ),

    /*
     * PDOK: Streekpaden
     */
    new OpenLayers.Layer.WMS(
        "Streekpaden",
        Heron.PDOK.urls.STREEKPADEN,
        {layers: "streekpaden", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ),

    /*
     * PDOK: Landelijke Fietsroutes
     */
    new OpenLayers.Layer.WMS(
        "Landelijke Fietsroutes",
        Heron.PDOK.urls.LFROUTES,
        {layers: "lfroutes", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ),

    /*
     * PDOK: RD Info Punten
     */
    new OpenLayers.Layer.WMS(
        "RD Info - Punten",
        Heron.PDOK.urls.RDINFO,
        {layers: "punten", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'punten',
                    featureNS: 'http://rdinfo.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 750000000,
                    maxQueryLength: 500000
                }
            }
        }
    ),

    /*
     * PDOK: RD Info Stations
     */
    new OpenLayers.Layer.WMS(
        "RD Info - Stations",
        Heron.PDOK.urls.RDINFO,
        {layers: "stations", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'stations',
                    featureNS: 'http://rdinfo.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 750000000,
                    maxQueryLength: 500000
                }
            }
        }
    ),

    /*
     * PDOK: RD Info Stations
     */
    new OpenLayers.Layer.WMS(
        "Natura 2000",
        Heron.PDOK.urls.NATURA2000,
        {layers: "natura2000", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'natura2000',
                    featureNS: 'http://natura2000.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }
        }
    ),


/** Natura 2000 (PDOK) */
    new OpenLayers.Layer.TMS("Natura 2000 (TMS)",
        Heron.PDOK.urls.PDOKTMS,
        {
            layername: 'natura2000',
            type: 'png',
            isBaseLayer: false,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            transitionEffect: 'resize'
        }),


    new OpenLayers.Layer.WMS(
        "Nationale Parken",
        Heron.PDOK.urls.NATIONALEPARKEN,
        {layers: 'nationaleparken', format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "NOK 2010 - EHS",
        Heron.PDOK.urls.NOK,
        {layers: 'ehs', format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),

    new OpenLayers.Layer.WMS(
        "NOK 2010 - RODS",
        Heron.PDOK.urls.NOK,
        {layers: 'rods', format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    new OpenLayers.Layer.WMS(
        "NOK 2010 - BBLBuitenbegrenzing",
        Heron.PDOK.urls.NOK,
        {
            layers: 'bblbuitenbegrenzing',
            format: "image/png8",
            transparent: true,
            info_format: 'application/vnd.ogc.gml'
        },
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    /*
     * EINDE PDOK
     */
    /* ------------------------------
     * LKI Kadastrale Vlakken
     * ------------------------------ */
    new OpenLayers.Layer.WMS("Kadastrale Vlakken",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "lki_vlakken", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize', maxResolution: 6.72,
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'kad',
                    featureNS: 'http://innovatie.kadaster.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ),

    /* ------------------------------
     * LKI Kadastrale Vlakken
     * ------------------------------ */
//    new OpenLayers.Layer.WMS("Kadastrale Vlakken (Subset)",
//            Heron.scratch.urls.KADEMO_OWS,
//            {layers: "lki_vlakken_small", format: "image/png", transparent: true},
//            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
//                metadata: {
//                    wfs: {
//                        protocol: 'fromWMSLayer',
//                        featurePrefix: 'kad',
//                        featureNS: 'http://innovatie.kadaster.nl',
//                        downloadFormats: Heron.options.wfs.downloadFormats,
//                        maxQueryArea: 1000000,
//                        maxQueryLength: 5000
//                    }
//                }
//            }
//    ),

    /*
     * Cadastral Parcels The Netherlands - 2009.
     */
    new OpenLayers.Layer.TMS(
        "Kadastrale Vlakken (tiled)",
        Heron.scratch.urls.KADEMO_GWC_TMS,
        {
            layername: 'kadkaart_vlakken@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: false,
            transparent: true,
            visibility: false,
            maxResolution: 6.72,
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/lki_vlakken.png',
                    hideInLegend: false
                }
            }
        }
    ),

    new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "lki_gebouwen", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ),


    /*
     * Buildings - The Netherlands - 2009.
     */
    new OpenLayers.Layer.TMS(
        "Kadastrale Gebouwen (tiled)",
        Heron.scratch.urls.KADEMO_GWC_TMS,
        {
            layername: 'kadkaart_gebouwen@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: false,
            transparent: true,
            visibility: false,
            maxResolution: 6.72,
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/lki_gebouwen.png',
                    hideInLegend: false
                }
            }
        }
    ),

    new OpenLayers.Layer.WMS("Kadastrale Teksten",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "lki_teksten", format: "image/png", transparent: true},
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml",
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ),

    new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "lki_vlakken", format: "image/png", styles: "lki_perceelnrs", transparent: true},
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            transitionEffect: 'resize'
        }
    ),

    /*
     * Cadastral Parcel numbers - The Netherlands - 2009.
     */
    new OpenLayers.Layer.TMS(
        "Perceel Nummers (tiled)",
        Heron.scratch.urls.KADEMO_GWC_TMS,
        {
            layername: 'kadkaart_perceelnrs@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: false,
            transparent: true,
            visibility: false
        }
    ),

    new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "kadkaart", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 0.7, transitionEffect: 'resize'}
    ),

    new OpenLayers.Layer.TMS(
        "Kadastrale Kaart Alles (tiled)",
        Heron.scratch.urls.KADEMO_GWC_TMS,
        {
            layername: 'kadkaart_alles@nlGridSetPDOK@png',
            type: "png",
            isBaseLayer: false,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            alpha: true, opacity: 0.7,
            maxResolution: 6.72,
            transitionEffect: 'resize',
            metadata: {
                legend: {
                    // Use a fixed URL as legend
                    legendURL: 'images/legend/lki_vlakken_gebouwen.png',
                    hideInLegend: false
                }
            }
        }
    ),
    new OpenLayers.Layer.WMS(
        "Bonnebladen 1850-1900",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "bonne_1850_1900", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha: true, opacity: 0.9, noLegend: true}
    ),

    new OpenLayers.Layer.WMS(
        "Bonnebladen 1901-1925",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "bonne_1901_1925", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha: true, opacity: 0.9, noLegend: true}
    ),

    new OpenLayers.Layer.WMS(
        "Bonnebladen 1926-1949",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "bonne_1926_1949", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha: true, opacity: 0.9, noLegend: true}
    ),
    new OpenLayers.Layer.WMS(
        "Rivierkaarten Bovenrijn (1830)",
        Heron.scratch.urls.KADEMO_OWS,
        {layers: "bovenrijn_maasmond_1830_1961", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha: true, opacity: 0.9, noLegend: true}
    ),

    // START Historische kaarten UvA

    new OpenLayers.Layer.WMS(
        "UvA TMK 1850",
        Heron.scratch.urls.UVA_SARA_TMK,
        {layers: "scans", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 1.0, noLegend: true}
    ),

    new OpenLayers.Layer.WMS(
        "UvA TMK 1850 Bladgrenzen",
        Heron.scratch.urls.UVA_SARA_TMK,
        {layers: "bladgrenzen", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 1.0, noLegend: true}
    ),

    new OpenLayers.Layer.WMS(
        "UvA Bonne",
        Heron.scratch.urls.UVA_SARA_BONNE,
        {layers: "scans", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 1.0, noLegend: true}
    ),

    new OpenLayers.Layer.WMS(
        "UvA Bonne Bladgrenzen",
        Heron.scratch.urls.UVA_SARA_BONNE,
        {layers: "bladgrenzen", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 1.0, noLegend: true}
    ),

/** RO-Online
 *
 */

    /* ------------------------------
     * RO Online info
     * zie ook http://afnemers.ruimtelijkeplannen.nl/afnemers/wms.jsp
     * ------------------------------ */
    new OpenLayers.Layer.WMS(
        "RO Online Bestemmingsplannen",
        Heron.scratch.urls.RO_WMS,
        {
            layers: "BP:Bestemmingsplangebied,BP:Rijksbestemmingsplangebied,BP:Uitwerkingsplangebied,BP:Wijzigingsplangebied,BP:Inpassingsplangebied,BP:Gebiedsaanduiding,BP:Figuur,BP:Dubbelbestemming,BP:Functieaanduiding,BP:Bouwaanduiding,BP:Lettertekenaanduiding,BP:Maatvoering,BP:Bouwvlak,BP:Enkelbestemming",
            format: "image/png",
            transparent: true
        },
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            alpha: true,
            opacity: 0.7
        }
    ),
// BP:Bestemmingsplangebied,BP:Rijksbestemmingsplangebied,BP:Uitwerkingsplangebied,BP:Wijzigingsplangebied,BP:Inpassingsplangebied,BP:Gebiedsaanduiding,BP:Figuur,BP:Dubbelbestemming,BP:Functieaanduiding,BP:Bouwaanduiding,BP:Lettertekenaanduiding,BP:Maatvoering,BP:Bouwvlak,BP:Enkelbestemming

    new OpenLayers.Layer.WMS(
        "RO Online Gem. Structuurvisie",
        Heron.scratch.urls.RO_WMS,
        {
            layers: "GSV:Structuurvisieplangebied,GSV:Structuurvisiecomplex,GSV:Structuurvisiegebied",
            format: "image/png",
            transparent: true
        },
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            alpha: true,
            opacity: 0.7
        }
    ),

    new OpenLayers.Layer.WMS(
        "RO Online Prov. Structuurvisie",
        Heron.scratch.urls.RO_WMS,
        {
            layers: "PSV:Structuurvisieplangebied,PSV:Structuurvisiecomplex,PSV:Structuurvisieverklaring,PSV:Structuurvisiegebied",
            format: "image/png",
            transparent: true
        },
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            alpha: true,
            opacity: 0.7
        }
    ),
    Heron.options.worklayers.editor,
    Heron.options.worklayers.scratch
];

/*
 * Define the Layer tree (shown in left menu)
 * Use the exact Open Layers Layer names to identify layers ("layer" attrs) from Heron.options.map.settings.layers above.
 * The text with each node is determined by the WMS Layer name, but may be overruled with a "text" attribute.
 *
 **/
Ext.namespace("Heron.options.layertree");
Heron.options.layertree.tree = [
    {
        // JvdB: Container for layers added via "Add layers", initially hidden until Layers added
        text: 'Toegevoegde Lagen', nodeType: 'hr_userlayercontainer', expanded: true, children: []
    },
    {
        text: 'Basis Kaarten', expanded: true, children: [
        {nodeType: "gx_layer", layer: "BRT Achtergrondkaart", text: "BRT (PDOK)"},
        {nodeType: "gx_layer", layer: "OpenBasisKaart OSM"},
        {nodeType: "gx_layer", layer: "OpenTopo (opentopo.nl)", text: "OpenTopo 14R9 (opentopo.nl)"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 TMS (GeoServer WMS)", text: "OpenTopo 14R11 GeoServer"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 TMS (MapServer WMS)", text: "OpenTopo 14R11 MapServer"},
        {nodeType: "gx_layer", layer: "Luchtfoto (PDOK)"},
        {nodeType: "gx_layer", layer: "TopRaster", text: "TopRaster (Kadaster)"},
        {nodeType: "gx_layer", layer: "Blanco"}
    ]
    },
    {
        text: 'OpenTopo14R11 - WMS Test', expanded: false, children: [

        {nodeType: "gx_layer", layer: "OpenTopo14R11 37.5", text: "WMS 37.5px/m"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 200", text: "WMS 200px/m"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 400", text: "WMS 400px/m"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 800", text: "WMS 800px/m"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 1600", text: "WMS 1600px/m"},
        {nodeType: "gx_layer", layer: "OpenTopo14R11 (opentopo.nl)", text: "WMS Group: 37.5-1600px/km"}
    ]
    },
    {
        text: 'Werkmap', expanded: true, children: [
        {nodeType: "gx_layer", layer: "Tekenlaag", text: "Tekenlaag"},
        {nodeType: "gx_layer", layer: "Kladlaag", text: "Kladlaag"}
    ]
    },
    {
        text: 'Kadaster', expanded: false, children: [

        {
            text: 'Kadastrale Kaart (zoom >8)', expanded: false, children: [
            {nodeType: "gx_layer", layer: "Kadastrale Vlakken", text: "Percelen (WMS)"},
            {nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)", text: "Percelen (tiled)"},
            {nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)", text: "Gebouwen (tiled)"},
            {nodeType: "gx_layer", layer: "Kadastrale Kaart Alles (tiled)", text: "Percelen en Gebouwen (tiled)"}
        ]
        }
    ]
    },
    {
        text: 'PDOK', expanded: false, children: [
        {
            text: 'BAG', expanded: false, children: [
            {nodeType: "gx_layer", layer: "BAG - Adressen", text: "BAG Adressen"},
            {nodeType: "gx_layer", layer: "BAG - Woonplaatsen", text: "BAG Woonplaatsen"},
            {nodeType: "gx_layer", layer: "BAG - Ligplaatsen", text: "BAG Ligplaatsen"},
            {nodeType: "gx_layer", layer: "BAG - Standplaatsen", text: "BAG Standplaatsen"},
            {nodeType: "gx_layer", layer: "BAG - Verblijfsobjecten", text: "BAG Verblijfsobjecten"},
            {nodeType: "gx_layer", layer: "BAG - Panden", text: "BAG Panden"},
            {nodeType: "gx_layer", layer: "BAG - Panden (WFS)", text: "BAG Panden (WFS)"}
        ]
        },
        {
            text: 'Bestuurlijke Grenzen', expanded: false, children: [
            /*							{nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Buurten", text: "Buurten" },
             {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Wijken", text: "Wijken" },  */
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Gemeenten", text: "Gemeenten (WMS)"},
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Gemeenten (WFS)", text: "Gemeenten (WFS)"},
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Provincies", text: "Provincies"},
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Provincies (WFS)", text: "Provincies (WFS)"},
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Land", text: "Land"},
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Land (WFS)", text: "Land (WFS)"}
        ]
        },
        {
            text: 'Digitaal Topografisch Bestand (DTB)', expanded: false, children: [
            {nodeType: "gx_layer", layer: "DTB Vlakken"},
            {nodeType: "gx_layer", layer: "DTB Lijnen"},
            {nodeType: "gx_layer", layer: "DTB Punten"}
        ]
        },
        {
            text: 'Actueel Hoogtebestand (AHN)', expanded: false, children: [
            {nodeType: "gx_layer", layer: "AHN2 0.5m Ruw"},
            {nodeType: "gx_layer", layer: "AHN2 0.5m Geinterpoleerd"},
            {nodeType: "gx_layer", layer: "AHN2 0.5m Niet Geinterpoleerd"},
            {nodeType: "gx_layer", layer: "AHN2 5m"},
            {nodeType: "gx_layer", layer: "AHN2 Bladindex"},
            {nodeType: "gx_layer", layer: "AHN 25m", text: 'AHN1 25m (Oud)'}
        ]
        },
        {
            text: 'Rijksdriehoeksmeting (RDInfo)', expanded: false, children: [
            {nodeType: "gx_layer", layer: "RD Info - Punten"},
            {nodeType: "gx_layer", layer: "RD Info - Stations"}
        ]

        },
        {
            text: 'Natuur & Mileu', expanded: false, children: [
            {nodeType: "gx_layer", layer: "Natura 2000"},
            {nodeType: "gx_layer", layer: "Nationale Parken"},
            {nodeType: "gx_layer", layer: "NOK 2010 - EHS"},
            {nodeType: "gx_layer", layer: "NOK 2010 - RODS"},
            {nodeType: "gx_layer", layer: "NOK 2010 - BBLBuitenbegrenzing", text: "NOK 2010 - BBLBuitenbegr."}
        ]
        }
    ]
    },
    {
        text: 'Historische Kaarten', expanded: false, children: [
        {nodeType: "gx_layer", layer: "Bonnebladen 1850-1900"},
        {nodeType: "gx_layer", layer: "Bonnebladen 1901-1925"},
        {nodeType: "gx_layer", layer: "Bonnebladen 1926-1949"},
        {text: 'UvA SARA', expanded: false, children: [
            {nodeType: "gx_layer", layer: "UvA TMK 1850", text: "TMK 1850"},
            {nodeType: "gx_layer", layer: "UvA Bonne", text: "Bonne"}
        ]},
        {text: 'Tests', expanded: false, children: [
            {nodeType: "gx_layer", layer: "BonnebladenFrieslandComposed"}


        ]}
    ]
    },
    {
        text: 'RO Online', expanded: false, children: [
        {nodeType: "gx_layer", layer: "RO Online Bestemmingsplannen", text: "Bestemmingsplannen (BP)"},
        {nodeType: "gx_layer", layer: "RO Online Gem. Structuurvisie", text: "Gem. Structuurvisie (GSV),"},
        {nodeType: "gx_layer", layer: "RO Online Prov. Structuurvisie", text: "Prov. Structuurvisie (PSV)"}
    ]
    }
];
