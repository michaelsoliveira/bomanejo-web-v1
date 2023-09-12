import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  Polygon,
  OverlayView
} from "@react-google-maps/api";
import Distance from "./Distance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from "@fortawesome/free-solid-svg-icons"
import { AiOutlineConsoleSql } from "react-icons/ai";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type MapProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  callBackPolygon?: any
  arvores?: Array<LatLngLiteral>
  polygonPath?: any;
  shapeText?: string;
}



export default function Map({ setLocation, arvores, polygonPath, callBackPolygon, shapeText = 'Shape' }: MapProps) {
  const [polygon, setPolygon] = useState<boolean>(true)
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  })

  const updateSize = () => {
    setSize({
      x: window.innerWidth,
      y: window.innerHeight
    })
  }

  useEffect(() => (onresize = updateSize), [])

  const [utLocation, setUtLocation] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  const onUnmountPolygon = useCallback(() => {
      listenersRef.current.forEach((lis: any) => lis?.remove());
      polygonRef.current = null;
      mapRef.current = undefined
  }, [])

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -3, lng: -49.8 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "e8b3ef309dafc25e",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  )

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any[]>([]);

  // Call setPath with new edited path
  const onEdit = useCallback((e) => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });

        polygon ? callBackPolygon(nextPath) : setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })

        if (e.domEvent?.ctrlKey) {
          // console.log(e)
          polygonRef.current?.getPath().removeAt(e.vertex)
        }
    }

  }, [callBackPolygon, polygon]);

  const handleClick = (e: any) => {
    const { latLng } = e;
    if (!polygon) {
      setLocation({ lat: latLng.lat(), lng: latLng.lng() })
      setUtLocation({ lat: latLng.lat(), lng: latLng.lng() })
    } else {
      
      callBackPolygon((prev: any)=> [...prev, { lat: latLng.lat(), lng: latLng.lng() }])
    }
  }

  const onLoad = useCallback((map) => {  
    mapRef.current = map
  }, []);
  const onLoadPolygon = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path?.addListener("set_at", onEdit),
        path?.addListener("insert_at", onEdit),
        path?.addListener("remove_at", onEdit),
      );
    },
    [onEdit]
  );
  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!utLocation) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: utLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="mt-2">
      <div className="pb-2">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-full">
            {!utLocation && <p>Selecione no mapa as coordenadas da UT</p>}
            {directions && <Distance leg={directions.routes[0].legs[0]} />}
          </div>
          <div className="flex flex-row items-center w-full space-x-2 justify-end">
            <div className="space-x-2">
              <input type="checkbox" 
                checked={polygon}
                onChange={() => setPolygon(!polygon)}
              /> { shapeText }
            </div> 
            { polygon && polygonPath.length > 0 && (
              <div onClick={() => callBackPolygon([])} className="flex flex-row px-4 py-2 space-x-2 border rounded-md">
                <div>
                    <FontAwesomeIcon icon={faEraser} />
                </div>
                <span>
                    Limpar
                </span>
                </div>
            ) }
           
          </div>
        </div>
      </div>
      <div className="map">
        
        <GoogleMap
          zoom={8}
          center={center}
          mapContainerStyle={{
            width: `${size.x > 1024 ? 920 : ''}${(size.x > 800 && size.x < 1024) ? 600 : ''}${size.x < 800 ? 400 : ''}px`,
            height: '400px'
          }}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleClick}
        >
          { polygonPath.length > 0 && (
            <>
            <Polygon
              paths={polygonPath}
              editable={polygon}
              draggable={polygon}
              // Event used when manipulating and adding points
              onMouseUp={onEdit}
              // Event used when dragging the whole Polygon
              onDragEnd={onEdit}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
              options={{
                fillColor: '#00FF00',
                fillOpacity: 0.4,
                strokeColor: '#00FF00',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            </>
          ) }
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 4,
                },
              }}
            />
          )}
          { utLocation && (
            <>
              <Marker
                position={utLocation}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />
            </>
          ) }
          {arvores && (
            <>
              <MarkerClusterer>
                {(clusterer) =>
                  <>
                    {arvores?.map((arv: any, idx: any) => (
                      <Marker
                        key={idx}
                        position={arv}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(arv);
                        } } 
                      />
                    ))}
                  </> 
                }
              </MarkerClusterer>

              {/* <Circle center={utLocation} radius={15000} options={closeOptions} />
              <Circle center={utLocation} radius={30000} options={middleOptions} />
              <Circle center={utLocation} radius={45000} options={farOptions} /> */}
            </>
          )}
        </GoogleMap>
      </div>
      {
        utLocation && (
          <div className="mt-2">
            <p className="flex text-sm flex-row items-center w-full">Coordenadas da UT:{" "}[{utLocation?.lat}, {utLocation?.lng}]</p>
          </div>
        )
      }
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
}