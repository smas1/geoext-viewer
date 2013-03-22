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

/** Heron Map Options (Dutch Maps and Overlays) */

Ext.namespace("Heron.options");
Ext.namespace("Heron.scratch");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH=25.4/0.28;

Ext.BLANK_IMAGE_URL = 'http://extjs.cachefly.net/ext-3.4.0/resources/images/default/s.gif';

/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "scratch" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.PDOK");

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
 * 	baseURL: 'http://geodata.nationaalgeoregister.nl',
 * 	TMS: 'http://geodata.nationaalgeoregister.nl/tms/',
 * 	WMTS:  'http://geodata.nationaalgeoregister.nl/tiles/service/wmts',
 * 	tileOriginLL: new OpenLayers.LonLat(-285401.920, 22598.080),
 * 	tileOriginUL: new OpenLayers.LonLat(-285401.920, 903401.920),
 * 	tileFullExtent:	new OpenLayers.Bounds(-285401.920, 22598.080, 595401.920, 903401.920),
 * 	serverResolutions : [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
 */

Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	/** Using the PDOK/Geonovum NL Tiling rec. */
	resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',

//	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
//	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
	center: '155000,463000',
	xy_precision: 3,
	zoom: 2,
	theme: null,

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
	}

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

Heron.scratch.urls = {
	ALTERRA_WMS : 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
	PDOK : 'http://geodata.nationaalgeoregister.nl',
	TNO_GRONDWATERSTANDEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0046?',
	TNO_BOORGATEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0044?',
	GS2_WMS :  'http://gis.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	GWC_TMS : 'http://kademo.nl/gwc/service/tms/',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	TILECACHE_KLIC1 :  'http://kom.kademo.nl/tms/10G058512_1/index.cgi/'
};

Heron.PDOK.urls = {
	PDOKTMS: Heron.scratch.urls.PDOK + '/tms/',
	BAGVIEWER: Heron.scratch.urls.PDOK + '/bagviewer/ows?',
	NATURA2000: Heron.scratch.urls.PDOK + '/natura2000/wms?',
	NATURA2000WMTS:  Heron.scratch.urls.PDOK + '/tiles/service/wmts/natura2000?',
	NWBWEGEN: Heron.scratch.urls.PDOK + '/nwbwegen/wms?',
	NWBVAARWEGEN: Heron.scratch.urls.PDOK + '/nwbvaarwegen/wms?',
	NWBSPOORWEGEN: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wms?',
	NWBSPOORWEGENWFS: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wfs?',
	DTB: Heron.scratch.urls.PDOK + '/digitaaltopografischbestand/wms?',
	NATIONALEPARKEN: Heron.scratch.urls.PDOK + '/nationaleparken/wms?',
	WETLANDS: Heron.scratch.urls.PDOK + '/wetlands/wms?',
	BESCHERMDENATUURMONUMENTEN: Heron.scratch.urls.PDOK + '/beschermdenatuurmonumenten/wms?',
	NHI: Heron.scratch.urls.PDOK + '/nhi/wms?',
	AHN25M: Heron.scratch.urls.PDOK + '/ahn25m/wms?',
	NOK: Heron.scratch.urls.PDOK + '/nok2010/wms?',
	VIN: Heron.scratch.urls.PDOK + '/vin/wms?',
	WEGGEG: Heron.scratch.urls.PDOK + '/weggeg/wms?',
	BESTUURLIJKEGRENZEN: Heron.scratch.urls.PDOK + '/bestuurlijkegrenzen/wms?',
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
	STREEKPADEN: Heron.scratch.urls.PDOK + '/streekpaden/wms?'
};

Heron.scratch.layermap = {
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */

	pdok_brtachtergrondkaart: new OpenLayers.Layer.TMS("BRT Achtergrondkaart",
			Heron.PDOK.urls.PDOKTMS,
			{layername: 'brtachtergrondkaart',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true,
				opacity: 1.0,
				attribution: "Bron: BRT Achtergrondkaart, � <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>",
				transitionEffect: 'resize'}),

	/*
	 * Basemap openStreetMap TileCache+Mapnik
	 */
	osm: new OpenLayers.Layer.WMS(
			"OpenStreetMap",
			Heron.scratch.urls.TILECACHE,
			{layers: "osm", format: "image/png", transparent: false},
			{singleTile: false, buffer: 0, isBaseLayer: true,  visibility: false,  hideInLegend: true,
				attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>", transitionEffect: 'resize'}
	),

	/*
	 * Basemap openStreetMap TileCache+Mapnik  NOT YET
	osm: new OpenLayers.Layer.TMS(
			"OpenStreetMap",
			Heron.scratch.urls.TILECACHE,
			{layername: 'osm',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true, opacity: 1.0,
				attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
				transitionEffect: 'resize'}
	),
	 */

	/*
	 * Combinatie top250/50/25
	 * http://kademo.nl/gwc/service/tms/1.0.0/top_raster@nlGridSetPDOK@png
	 */
	topraster: new OpenLayers.Layer.TMS(
			"TopRaster",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'top_raster@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true, opacity: 1.0,
				transitionEffect: 'resize'}
	),


	/*
	 * Top10 NL rendering Geodan
	 */
	top10nlgeodan: new OpenLayers.Layer.TMS(
			"Top10NL (Geodan)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'top10_geodan@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true, opacity: 1.0,
				transitionEffect: 'resize'}
	),

	/*
	 * Areal images NLR.
	 */
	luchtfotonlr: new OpenLayers.Layer.TMS(
			"Luchtfoto (NLR)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'luchtfoto_nlr@nlGridSetPDOK@png',
				type: "jpeg",
				isBaseLayer: true,
				visibility: false}
	),

	blanco: new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
			new OpenLayers.Size(10, 10),
			{resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
	),

	/** OVERLAYS **/

	/*
	 * PDOK: BagViewer Lagen
	 */
	bag_panden: new OpenLayers.Layer.WMS(
			"BAG - Panden",
			Heron.PDOK.urls.BAGVIEWER,
			{layers: "pand", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * PDOK: BagViewer Lagen
	 */
	bag_verblijfsobjecten: new OpenLayers.Layer.WMS(
			"BAG - Verblijfsobjecten",
			Heron.PDOK.urls.BAGVIEWER,
			{layers: "verblijfsobject", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * PDOK: Lange Afstands Wandelpaden
	 */
	lawroutes: new OpenLayers.Layer.WMS(
			"Lange Afstands Wandelroutes",
			Heron.PDOK.urls.LAWROUTES,
			{layers: "lawroutes", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * PDOK: Streekpaden
	 */
	streekpaden: new OpenLayers.Layer.WMS(
			"Streekpaden",
			Heron.PDOK.urls.STREEKPADEN,
			{layers: "streekpaden", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * PDOK: Landelijke Fietsroutes
	 */
	lfroutes: new OpenLayers.Layer.WMS(
			"Landelijke Fietsroutes",
			Heron.PDOK.urls.LFROUTES,
			{layers: "lfroutes", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * Historic overlays
	 */
	bonne1865: new OpenLayers.Layer.WMS("Historische Topo Kaart (1865)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'BONNE_1865', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),
	bonne1900: new OpenLayers.Layer.WMS("Historische Topo Kaart (1900)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'BONNE_1900', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),
	bonne1915: new OpenLayers.Layer.WMS("Historische Topo Kaart (1915)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'BONNE_1915', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),
	bonne1925: new OpenLayers.Layer.WMS("Historische Topo Kaart (1925)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'BONNE_1925', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),

	bonne1949: new OpenLayers.Layer.WMS("Historische Topo Kaart (1949)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'BONNE_1949', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),

	tmk1850: new OpenLayers.Layer.WMS("Militaire Kaart (1850)",
			Heron.scratch.urls.ALTERRA_WMS,
			{'layers': 'TMK_KLEUR_1850', 'format': 'image/png'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),

	/*
	 * AHN - Algemeen Hoogtebestand NL - DEM colour relief Netherlands
	 */
	ahndem2: new OpenLayers.Layer.WMS(
			"NL Height Map",
			Heron.scratch.urls.GS2_WMS,
			{layers: "ahn-nl-dem2", format: "image/jpeg"},
			{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * Hockeyclubs
	 */
	hockeyclubs: new OpenLayers.Layer.WMS(
			"Hockeyclubs",
			Heron.scratch.urls.GS2_WMS,
			{layers: "hockeyclubs", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7,
				featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * RD info
	 */
	rdstations: new OpenLayers.Layer.WMS(
			"RD stations",
			Heron.scratch.urls.GS2_WMS,
			{layers: "rdinfo_rdstations", format: "image/gif", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * Ecologische Hoofdstructuur (EHS)
	 */
	ehs: new OpenLayers.Layer.WMS("Ecologische Hoofdstructuur",
			Heron.scratch.urls.GS2_WMS,
			{'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, hideInLegend: true, transitionEffect: 'resize'}
	),

	/** Natura 2000 (PDOK) */
	natura2000tms: new OpenLayers.Layer.TMS("Natura 2000 (TMS)",
			Heron.PDOK.urls.PDOKTMS,
			{layername: 'natura2000', type:'png', isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false, transitionEffect: 'resize'}),

	/*
	 * KNMI Radar
	 */
	knmi_radar_bw: new OpenLayers.Layer.WMS("KNMI Radar",
			Heron.scratch.urls.KNMI_WMS_RADAR,
			{'layers': 'RADNL_OPER_R___25PCPRR_L3_KNMI', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, transitionEffect: 'resize'}
	),

	knmi_radar_color: new OpenLayers.Layer.WMS("KNMI Radar Color",
			Heron.scratch.urls.KNMI_WMS_RADAR,
			{'layers': 'RADNL_OPER_R___25PCPRR_L3_COLOR', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, transitionEffect: 'resize'}
	),

	// TODO
	// Add: http://geoservices.knmi.nl/cgi-bin/INTER_OPER_R___OBSERV__L3.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
	// (daily precipitation)

	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	lki_vlakken: new OpenLayers.Layer.WMS("Kadastrale Vlakken",
			Heron.scratch.urls.GS2_WMS,
			{layers: "lki_vlakken", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
				,featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize', maxResolution: 6.72}
	),

	/*
	 * Cadastral Parcels The Netherlands - 2009.
	 */
	lki_vlakken_tiled: new OpenLayers.Layer.TMS(
			"Kadastrale Vlakken (tiled)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'kadkaart_vlakken@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: false,
				transparent: true,
				visibility: false}
	),

	lki_gebouwen: new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
			Heron.scratch.urls.GS2_WMS,
			{layers: "lki_gebouwen", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
				,featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),


	/*
	 * Buildings - The Netherlands - 2009.
	 */
	lki_gebouwen_tiled: new OpenLayers.Layer.TMS(
			"Kadastrale Gebouwen (tiled)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'kadkaart_gebouwen@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: false,
				transparent: true,
				visibility: false}
	),

	lki_teksten: new OpenLayers.Layer.WMS("Kadastrale Teksten",
			Heron.scratch.urls.GS2_WMS,
			{layers: "lki_teksten", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true ,featureInfoFormat: "application/vnd.ogc.gml", hideInLegend: true, transitionEffect: 'resize'}
	),

	lki_perceelnrs: new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
			Heron.scratch.urls.GS2_WMS,
			{layers: "lki_vlakken", format: "image/png", styles: "lki_perceelnrs", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'}
	),

	/*
	 * Cadastral Parcel numbers - The Netherlands - 2009.
	 */
	lki_perceelnrs_tiled: new OpenLayers.Layer.TMS(
			"Perceel Nummers (tiled)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'kadkaart_perceelnrs@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: false,
				transparent: true,
				visibility: false}
	),

	kadkaart: new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
			Heron.scratch.urls.GS2_WMS,
			{layers: "kadkaart", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, transitionEffect: 'resize'}

	),

	kadkaart_tiled: new OpenLayers.Layer.TMS(
			"Kadastrale Kaart Alles (tiled)",
			Heron.scratch.urls.GWC_TMS,
			{layername: 'kadkaart_alles@nlGridSetPDOK@png',
				type: "png",
				isBaseLayer: false,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true, opacity: 0.7,
				transitionEffect: 'resize'}
	),

	/*
	 * TNO
	 * Grondwaterstanden
	 * Lithologie (boorgaten)
	 */
	tno_grondwaterstanden: new OpenLayers.Layer.WMS(
			"TNO Grondwaterputten",
			Heron.scratch.urls.TNO_GRONDWATERSTANDEN,
			{
				layers: 'Grondwaterputten',
				format: "image/png",
				transparent: true
			},
			{
				isBaseLayer: false,
				singleTile: true,
				visibility: false,
				hideInLegend: true,
				featureInfoFormat: 'application/vnd.ogc.wms_xml',
				transitionEffect: 'resize'
			}
	),

	tno_grondboorgaten: new OpenLayers.Layer.WMS(
			"TNO Boorgaten",
			Heron.scratch.urls.TNO_BOORGATEN,
			{
				layers: 'Boringen',
				format: "image/png",
				transparent: true,
				info_format: 'application/vnd.ogc.wms_xml'
			},
			{
				isBaseLayer: false,
				singleTile: true,
				hideInLegend: true,
				visibility: false,
				transitionEffect: 'resize'
			}
	)
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
//	Heron.scratch.layermap.pdok_natura2000_wmts,
	Heron.scratch.layermap.pdok_brtachtergrondkaart,
	Heron.scratch.layermap.osm,
	Heron.scratch.layermap.topraster,
	Heron.scratch.layermap.top10nlgeodan,
	Heron.scratch.layermap.luchtfotonlr,
	Heron.scratch.layermap.blanco,

	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
	 */

	/** BAG PDOK. */
	Heron.scratch.layermap.bag_panden,
	Heron.scratch.layermap.bag_verblijfsobjecten,
	Heron.scratch.layermap.lawroutes,
	Heron.scratch.layermap.streekpaden,
	Heron.scratch.layermap.lfroutes,

	Heron.scratch.layermap.knmi_radar_color,
	Heron.scratch.layermap.knmi_radar_bw,

	/* ------------------------------
	 * DEM NL Colour Relief
	 * ------------------------------ */
	Heron.scratch.layermap.ahndem2,

	/* ------------------------------
	 * Hockeyclubs
	 * ------------------------------ */
	Heron.scratch.layermap.hockeyclubs,

	/* ------------------------------
	 * RD info
	 * ------------------------------ */
	Heron.scratch.layermap.rdstations,

	/* ------------------------------
	 * Ecologische Hoofdstructuur (EHS)
	 * ------------------------------ */
	Heron.scratch.layermap.ehs,
	Heron.scratch.layermap.natura2000tms,

	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	Heron.scratch.layermap.lki_vlakken,
	Heron.scratch.layermap.lki_gebouwen_tiled,
	Heron.scratch.layermap.kadkaart_tiled,
/** TNO **/
	Heron.scratch.layermap.tno_grondwaterstanden,
	Heron.scratch.layermap.tno_grondboorgaten

];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
/*	{type: "scale"},   Leave out: see http://code.google.com/p/geoext-viewer/issues/detail?id=116 */
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "coordinatesearch", options: {onSearchCompleteZoom: 8}},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
	{type: "measurelength", options: {geodesic: false}},
	{type: "measurearea", options: {geodesic: false}}
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
'<div class="hr-html-panel-body"><p>This is the Heron Mapping Client.' +
							'</p><br/><p>This viewer and in fact the entire website has been made with the Open Source' +
							' project <a href="http://heron-mc.org" target="_new" >Heron Mapping Client</a>. This on ' +
							'<a href="http://geoext.org">GeoExt</a>-based Viewer is very flexible and extensible ' +
							'See examples like <a href="http://inspire.kademo.nl" target="_new">Heron MC for Kademo INSPIRE</a>.</p><br/></div>'

/** Values for ContextBrowser (shortcuts to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.contextbrowser");
Heron.options.contextbrowser =
		[
			{
				id: 'tno',
				name: 'TNO Boorgaten',
				desc: 'een voorbeeld van een TNO Dino Services',
				layers: ['OpenStreetMap', 'TNO Boorgaten'],
				x: 133993,
				y: 473167,
				zoom: 10
			},
			{
				id: 'debrug',
				name: 'Kadaster - De Brug',
				desc: 'een voorbeeld van een Place2',
				layers: ['Luchtfoto (NLR)'],
				x: 194194,
				y: 465873,
				zoom: 10
			}
		];