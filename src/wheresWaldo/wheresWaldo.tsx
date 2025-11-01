import { useRef, useState, useEffect } from 'react';

class imgMap {
  name: string;
  coords: string;
  constructor(name: string, coords: string) {
    this.name = name;
    this.coords = coords;
  }
}

/** Originally the image map was generated from https://www.image-map.net/ */
export default function WheresWaldo() {
  const img = useRef<HTMLImageElement | null>(null);
  const htmlMap = useRef<HTMLMapElement | null>(null);
  const [msg, setMsg] = useState('Look for Engineer George.');

  const imgMaps = [
    new imgMap('Engineer George', '2228,1203,2151,1113'),
    new imgMap('Lyle', '1382,1307,1175,1192'),
    new imgMap('Gustav', '705,499,887,767'),
    new imgMap('Lt Carstairs', '1947,1620,1634,1167'),
    new imgMap('Sam', '3,1260,249,1586'),
    new imgMap('Private Darius', '2416,1424,2617,1647'),
    new imgMap('Brutus', '1037,1689,629,1242'),
    new imgMap('The Reaper', '1698,392,1931,775'),
    new imgMap('Brother Matheus', '3281,1526,3607,1963'),
    new imgMap('Private Graham', '632,1022,1076,1239'),
    new imgMap('Sgt Smith', '415,1357,610,1635'),
    new imgMap('Preacher Pete', '1302,1648,1628,1297'),
    new imgMap('Private Chris', '287,1118,491,1357'),
    new imgMap('Private Jones', '2901,1191,2987,1300'),
    new imgMap('Specialist Mark', '1449,1135,1637,1294'),
    new imgMap('Brother Julius', '2253,732,2528,984'),
  ];

  /** From https://css-tricks.com/revisiting-image-maps/ */
  const resizeMap = () => {
    console.log('resizeMap');
    if (!img || !htmlMap || !img.current?.naturalWidth) {
      return;
    }

    const scale = img.current.clientWidth / img.current.naturalWidth;

    htmlMap.current?.querySelectorAll('area').forEach((area) => {
      if (!area.dataset.originalCoords) {
        area.dataset.originalCoords = area.getAttribute('coords') as string;
      }

      const scaledCoords = area.dataset.originalCoords
        .split(',')
        .map((c) => Math.round(Number.parseInt(c) * scale))
        .join(',');
      area.setAttribute('coords', scaledCoords);
    });
  };

  window.addEventListener('load', resizeMap);
  window.addEventListener('resize', resizeMap);

  useEffect(resizeMap, [img, htmlMap]);

  const imgFinder = (name: string) => {
    if (name === 'Engineer George') {
      setMsg('You found Engineer George!');
    } else {
      setMsg(`You found ${name}. Look for Engineer George.`);
    }
  };

  return (
    <main>
      <h1 className="centertext">Where's George?</h1>
      <img
        src="/Link477-React/TrenchCrusade.jpg"
        alt="Trench Crusade New Antioch Warband."
        width="100%"
        useMap="#trenchMap"
        ref={img}
      />
      <map name="trenchMap" ref={htmlMap}>
        {imgMaps.map((i) => (
          <area
            key={i.name}
            alt={i.name}
            coords={i.coords}
            shape="rect"
            onClick={() => imgFinder(i.name)}
          />
        ))}
      </map>
      <p>{msg}</p>
      <img
        src="/Link477-React/EngineerGeorge.jpg"
        alt="Engineer George"
        height={200}
        width={125}
      />
    </main>
  );
}
