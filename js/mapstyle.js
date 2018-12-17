// A styles array to style the map.
var styles = [
	{
		featureType: 'all',
		elementType: 'labels.text.fill',
		stylers: [
			{ saturation: 36 },
			{ color: '#f706cf' },
			{ lightness: 40 }
		]
	},{
		featureType: 'all',
		elementType: 'labels.text.stroke',
		stylers: [
			{ visibility: 'on' },
			{ color: '#000000' },
			{ lightness: 16 }
		]
	},{
		featureType: 'all',
		elementType: 'labels.icon',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'administrative',
		elementType: 'geometry.fill',
		stylers: [
			{ color: '#000000' },
			{ lightness: 20 }
		]
	},{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [
			{ color: '#000000' },
			{ lightness: 17 },
			{ weight: 1.2 }
		]
	},{
		featureType: 'landscape',
   		elementType: 'geometry',
   		stylers: [
       		{ color: '#000000' },
       		{ lightness: 20 }
		]
   	},{
   		featureType: 'poi',
   		elementType: 'geometry',
   		stylers: [
     		{ color: '#000000' },
     		{ lightness: 21 }
		]
   	},{
   		featureType: 'road.highway',
   		elementType: 'geometry.fill',
   		stylers: [
    		{ color: '#000000' },
    		{ lightness: 17 }
		]
   	},{
	    featureType: 'road.highway',
      	elementType: 'geometry.stroke',
      	stylers: [
        	{ color: '#3506ff' },
        	{ lightness: 29 },
        	{ weight: 1 }
		]
    },{
   		featureType: 'road.arterial',
   		elementType: 'geometry',
   		stylers: [
       		{ color: '#75617a' },
       		{ lightness: 18 }
		]
   	},{
		featureType: 'road.local',
   		elementType: 'geometry',
   		stylers: [
			{ color: '#000000' },
       		{ lightness: 16 }
		]
   	},{
   		featureType: 'transit',
   		elementType: 'geometry',
   		stylers: [
      		{ color: '#fd00e1' },
       		{ lightness: 19 }
		]
   	},{
		featureType: 'transit.station',
		stylers: [
			{ weight: 9 },
			{ hue: '#f6019d' }
		]
	},{
   		featureType: 'water',
   		elementType: 'geometry',
   		stylers: [
       		{ color: '#023788' },
       		{ lightness: 17 }
		]
   	},{
	    featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{ lightness: 100 }
		]
	},{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{ lightness: -100 }
		]
	}
];
