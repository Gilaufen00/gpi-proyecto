/**
 * PETCARE HOME - Native 3D Embedded Pets & Staff Component
 * Modelos 3D procedurales nativos en WebGL/Three.js para:
 * - Mascotas: Perro, Gato, Ave, Otra Especie
 * - Personal Responsable: Hombre y Mujer (Estilo cute original, hombros redondeados suaves
 *   sin protuberancias ni bolas raras, tono de piel cálido suave sin ser oscuro, y cabello corto limpio sin diseño)
 */

(function () {
  'use strict';

  // ========================================================================
  // PALETA VIVA TOON Y GRADIENTE DE SOMBREADO
  // ========================================================================
  const colors = {
    // Perrito (Caramelo miel cálido con alto contraste)
    dogFur: 0xBD6F29,        // Marrón caramelo cálido
    dogCream: 0xF5DCBC,      // Crema suave para pecho y hocico
    dogEars: 0x8C4916,       // Marrón avellana cálido para orejas redondeadas
    dogCollar: 0x6C5CE7,     // Collar lila PetCare
    dogGold: 0xFFC83D,       // Medallita dorada
    dogNose: 0x2A1B28,       // Trufa oscura definida
    dogTongue: 0xFF6B81,     // Lengüita rosa
    blush: 0xFF9AAE,         // Rubor mejillas

    // Gatita (Atigrada naranja y blanca)
    catFur: 0xFF8A2E,        // Naranja vivo cálido
    catStripes: 0xD45D18,    // Rayitas atigradas
    catWhite: 0xFFF7F0,      // Pecho y hocico blanco puro
    catEarsInner: 0xFFAEC0,  // Interior orejitas rosa
    catNose: 0xFF708B,       // Naricita
    catPads: 0xFF99AC,       // Cojinetes
    whisker: 0x8C7462,       // Bigotes

    // Ave (Pajarito celeste pastel con piquito naranja y cresta)
    birdBody: 0x38B6FF,      // Celeste turquesa suave y alegre
    birdBelly: 0xFFFAF0,     // Pancita blanca cremosa
    birdWings: 0x1E96E6,     // Alitas azul cielo
    birdTail: 0x1880C7,      // Plumitas de la cola
    birdBeak: 0xFF7A00,      // Piquito naranja vivo
    birdFeet: 0xFFA048,      // Patitas naranja suave
    birdCheek: 0xFF94B8,     // Mejillas rosadas
    birdCrest: 0xFFD166,     // Cresta plumitas doradas

    // Otra Especie (Signo de interrogación místico / mascota misteriosa)
    otherMark: 0x6C5CE7,     // Violeta PetCare
    otherDot: 0xFF7675,      // Coral de la marca
    otherPedestal: 0xF1EFFE, // Plataforma lila claro
    otherRim: 0xA29BFE,      // Borde lavanda
    otherStar: 0xFFD166,     // Estrellas doradas brillantes

    // Personal Responsable Humano (Hombre y Mujer) - Tono cálido natural suave (un poco más oscuro que el pálido, no tanto)
    skinWarm: 0xF2C29B,       // Tono piel cálido, suave y dorado natural
    skinShadow: 0xE0A37A,     // Sombra de piel
    hairDark: 0x2A1C14,       // Cabello corto oscuro limpio sin diseño
    hairChestnut: 0x3E2214,   // Cabello castaño Dra. Diana
    scrubDoctor: 0x38B6FF,    // Celeste médico profesional Dr. Carlos
    scrubDiana: 0x6C5CE7,     // Violeta PetCare Dra. Diana
    scrubAndres: 0x5644C9,    // Uniforme estilista Andrés
    coatWhite: 0xFFFFFF,      // Cuello bata blanca
    stethoTube: 0x334155,     // Tubo fonendoscopio
    stethoMetal: 0xCBD5E1,    // Campana metálica
    mouthCute: 0xFF6B81,      // Sonrisa rosa alegre
    blushCute: 0xFFAEC0,      // Rubor rosado cute

    yarnCyan: 0x3EC9F0,
    yarnPink: 0xFF6F86,
    yarnYellow: 0xFFD93D
  };

  let toonGradient = null;
  function getToonGradient() {
    if (toonGradient) return toonGradient;
    const data = new Uint8Array([
      140, 140, 140, 255,
      205, 205, 205, 255,
      255, 255, 255, 255
    ]);
    toonGradient = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
    toonGradient.minFilter = THREE.NearestFilter;
    toonGradient.magFilter = THREE.NearestFilter;
    toonGradient.generateMipmaps = false;
    toonGradient.needsUpdate = true;
    return toonGradient;
  }

  function createToonMat(color) {
    return new THREE.MeshToonMaterial({ color: color, gradientMap: getToonGradient() });
  }

  const V = (x, y, z) => new THREE.Vector3(x, y, z);

  function sph(mat, r, x, y, z, sx = 1, sy = 1, sz = 1) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 22, 18), mat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    return m;
  }

  function makeLimb(start, end, rStart, rEnd, mat) {
    const group = new THREE.Group();
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rEnd, rStart, len, 16), mat);
    cyl.position.copy(start).add(end).multiplyScalar(0.5);
    cyl.quaternion.setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
    group.add(cyl);
    group.add(sph(mat, rStart, start.x, start.y, start.z));
    group.add(sph(mat, rEnd, end.x, end.y, end.z));
    return group;
  }

  // ========================================================================
  // 1. FABRICADOR DEL PERRITO (MILO)
  // ========================================================================
  function buildDog() {
    const group = new THREE.Group();
    const fur = createToonMat(colors.dogFur);
    const cream = createToonMat(colors.dogCream);
    const earMat = createToonMat(colors.dogEars);
    const noseMat = createToonMat(colors.dogNose);
    const tongueMat = createToonMat(colors.dogTongue);
    const collarMat = createToonMat(colors.dogCollar);
    const goldMat = createToonMat(colors.dogGold);
    const blushMat = new THREE.MeshBasicMaterial({ color: colors.blush, transparent: true, opacity: 0.8 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    group.add(sph(fur, 0.62, 0, 0.9, 0, 1.0, 1.15, 0.95));
    group.add(sph(fur, 0.62, 0, 0.5, -0.02, 1.05, 0.78, 0.92));

    group.add(sph(cream, 0.4, 0, 0.95, 0.4, 0.9, 1.1, 0.55));
    group.add(sph(cream, 0.16, -0.12, 0.72, 0.5));
    group.add(sph(cream, 0.16, 0.12, 0.72, 0.5));
    group.add(sph(cream, 0.14, 0, 0.62, 0.52));

    group.add(sph(fur, 0.4, 0, 1.45, 0.15));

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.065, 14, 32), collarMat);
    collar.rotation.x = Math.PI / 2 + 0.3;
    collar.position.set(0, 1.42, 0.16);
    group.add(collar);

    const tag = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.035, 18), goldMat);
    tag.rotation.x = Math.PI / 2 - 0.3;
    tag.position.set(0, 1.22, 0.64);
    group.add(tag);

    const head = new THREE.Group();
    head.position.set(0, 1.95, 0.18);
    head.add(sph(fur, 0.6, 0, 0, 0, 1.08, 0.95, 1.0));

    head.add(sph(fur, 0.26, -0.4, -0.16, 0.2));
    head.add(sph(fur, 0.26, 0.4, -0.16, 0.2));
    head.add(sph(fur, 0.14, 0, 0.52, 0.12));
    head.add(sph(cream, 0.13, 0, 0.2, 0.53, 0.75, 1.3, 0.55));

    head.add(sph(cream, 0.28, 0, -0.18, 0.45, 1.2, 0.85, 1.05));
    head.add(sph(noseMat, 0.09, 0, -0.08, 0.73, 1.35, 0.9, 0.9));

    head.add(sph(noseMat, 0.1, 0, -0.3, 0.67, 1.1, 0.5, 0.6));
    const tongue = sph(tongueMat, 0.09, 0, -0.37, 0.7, 0.9, 0.45, 1.0);
    head.add(tongue);

    [-0.23, 0.23].forEach(x => {
      const eye = sph(eyeMat, 0.095, x, 0.06, 0.52);
      eye.add(sph(sparkleMat, 0.032, 0.03, 0.035, 0.07));
      eye.add(sph(sparkleMat, 0.015, -0.03, -0.03, 0.08));
      head.add(eye);
    });

    head.add(sph(blushMat, 0.07, -0.36, -0.1, 0.5, 1.3, 0.7, 0.4));
    head.add(sph(blushMat, 0.07, 0.36, -0.1, 0.5, 1.3, 0.7, 0.4));

    const ears = [];
    [-1, 1].forEach(side => {
      const earGroup = new THREE.Group();
      earGroup.position.set(side * 0.52, 0.3, -0.02);
      const ear = sph(earMat, 0.27, side * 0.08, -0.26, 0.02, 0.62, 1.2, 0.42);
      ear.rotation.z = side * 0.25;
      earGroup.add(ear);
      head.add(earGroup);
      ears.push(earGroup);
    });

    group.add(head);

    [-1, 1].forEach(side => {
      group.add(makeLimb(V(side * 0.3, 1.0, 0.4), V(side * 0.3, 0.17, 0.6), 0.16, 0.14, fur));
      group.add(sph(cream, 0.17, side * 0.3, 0.1, 0.68, 1.0, 0.62, 1.3));

      group.add(sph(fur, 0.34, side * 0.45, 0.4, -0.02, 0.8, 0.95, 1.15));
      group.add(makeLimb(V(side * 0.46, 0.32, 0.1), V(side * 0.48, 0.13, 0.28), 0.14, 0.12, fur));
      group.add(sph(fur, 0.16, side * 0.48, 0.09, 0.34, 0.9, 0.6, 1.45));
    });

    const tail = new THREE.Group();
    tail.position.set(0, 0.32, -0.5);
    const tailCurve = new THREE.CatmullRomCurve3([
      V(0, 0, 0), V(0, 0.12, -0.25), V(0.04, 0.42, -0.42), V(0.1, 0.72, -0.36)
    ]);
    tail.add(new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 20, 0.1, 10, false), fur));
    tail.add(sph(cream, 0.13, 0.1, 0.74, -0.36, 1, 1.15, 1));
    group.add(tail);

    return {
      mesh: group,
      head: head,
      tail: tail,
      tongue: tongue,
      ears: ears,
      animate: function (time) {
        group.scale.y = 1.0 + Math.sin(time * 3.5) * 0.02;
        tail.rotation.y = Math.sin(time * 9.5) * 0.55;
        tail.rotation.z = Math.cos(time * 9.5) * 0.2;
        head.rotation.z = Math.sin(time * 1.8) * 0.1;
        head.rotation.x = Math.sin(time * 2.5) * 0.05;
        tongue.scale.z = 1.0 + Math.sin(time * 4) * 0.2;
        ears.forEach((ear, i) => {
          ear.rotation.x = Math.sin(time * 3 + i) * 0.08;
        });
      }
    };
  }

  // ========================================================================
  // 2. FABRICADOR DE LA GATITA (LUNA)
  // ========================================================================
  function buildCat() {
    const group = new THREE.Group();
    const fur = createToonMat(colors.catFur);
    const stripe = createToonMat(colors.catStripes);
    const white = createToonMat(colors.catWhite);
    const innerEar = createToonMat(colors.catEarsInner);
    const noseMat = createToonMat(colors.catNose);
    const padMat = createToonMat(colors.catPads);
    const blushMat = new THREE.MeshBasicMaterial({ color: colors.blush, transparent: true, opacity: 0.8 });
    const whiskerMat = new THREE.MeshBasicMaterial({ color: colors.whisker });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    group.add(sph(fur, 0.6, 0, 0.8, 0, 0.95, 1.15, 0.95));
    group.add(sph(fur, 0.6, 0, 0.48, 0, 1.05, 0.75, 1.0));

    group.add(sph(white, 0.42, 0, 0.85, 0.36, 0.85, 1.15, 0.55));
    group.add(sph(white, 0.18, 0, 1.12, 0.4));

    [[0.85, 0.575], [1.0, 0.553], [1.15, 0.5]].forEach(([y, r]) => {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 8, 24, Math.PI * 0.8), stripe);
      arc.rotation.x = -Math.PI / 2;
      arc.rotation.z = Math.PI * 0.1;
      arc.position.set(0, y, 0);
      group.add(arc);
    });

    const head = new THREE.Group();
    head.position.set(0, 1.6, 0.1);
    head.add(sph(fur, 0.56, 0, 0, 0, 1.12, 0.95, 1.0));

    head.add(sph(fur, 0.24, -0.42, -0.14, 0.12, 1, 0.8, 0.9));
    head.add(sph(fur, 0.24, 0.42, -0.14, 0.12, 1, 0.8, 0.9));

    head.add(sph(white, 0.16, -0.1, -0.16, 0.46));
    head.add(sph(white, 0.16, 0.1, -0.16, 0.46));
    head.add(sph(white, 0.11, 0, -0.27, 0.42));
    head.add(sph(noseMat, 0.055, 0, -0.06, 0.6, 1.4, 0.9, 0.8));

    [-0.22, 0.22].forEach(x => {
      const eye = sph(eyeMat, 0.1, x, 0.05, 0.48);
      eye.add(sph(sparkleMat, 0.034, 0.03, 0.035, 0.075));
      eye.add(sph(sparkleMat, 0.016, -0.03, -0.03, 0.085));
      head.add(eye);
    });

    head.add(sph(blushMat, 0.065, -0.34, -0.12, 0.47, 1.3, 0.7, 0.4));
    head.add(sph(blushMat, 0.065, 0.34, -0.12, 0.47, 1.3, 0.7, 0.4));

    [-1, 1].forEach(side => {
      [-0.04, 0, 0.04].forEach((dy, i) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.36, 6), whiskerMat);
        w.position.set(side * 0.36, -0.17 + dy, 0.5);
        w.rotation.z = Math.PI / 2 + side * (i - 1) * 0.15;
        head.add(w);
      });
    });

    [-1, 1].forEach(side => {
      const earGeo = new THREE.ConeGeometry(0.2, 0.42, 18);
      earGeo.scale(1, 1, 0.55);
      const ear = new THREE.Mesh(earGeo, fur);
      ear.position.set(side * 0.34, 0.52, -0.02);
      ear.rotation.z = -side * 0.3;

      const innerGeo = new THREE.ConeGeometry(0.12, 0.28, 16);
      innerGeo.scale(1, 1, 0.35);
      const inner = new THREE.Mesh(innerGeo, innerEar);
      inner.position.set(0, -0.04, 0.08);
      ear.add(inner);
      head.add(ear);
    });

    group.add(head);

    const paws = [];
    [-1, 1].forEach(side => {
      const pawGroup = new THREE.Group();
      pawGroup.position.set(side * 0.22, 1.0, 0.3);
      const endLocal = V(-side * 0.05, -0.38, 0.36);
      pawGroup.add(makeLimb(V(0, 0, 0), endLocal, 0.12, 0.1, fur));
      pawGroup.add(sph(white, 0.13, endLocal.x, endLocal.y - 0.02, endLocal.z + 0.04, 1, 0.75, 1.15));
      pawGroup.add(sph(padMat, 0.045, endLocal.x, endLocal.y - 0.07, endLocal.z + 0.1, 1, 0.6, 1));
      group.add(pawGroup);
      paws.push(pawGroup);
    });

    [-1, 1].forEach(side => {
      group.add(sph(fur, 0.3, side * 0.42, 0.35, 0, 0.8, 0.9, 1.15));
      group.add(makeLimb(V(side * 0.42, 0.28, 0.12), V(side * 0.4, 0.12, 0.28), 0.12, 0.1, fur));
      group.add(sph(white, 0.14, side * 0.4, 0.08, 0.34, 0.85, 0.55, 1.4));
    });

    const yarn = new THREE.Group();
    yarn.position.set(0, 0.32, 0.82);
    yarn.add(sph(createToonMat(colors.yarnCyan), 0.3, 0, 0, 0));

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.04, 10, 24), createToonMat(colors.yarnPink));
    ring1.rotation.x = 0.8;
    yarn.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.035, 10, 24), createToonMat(colors.yarnYellow));
    ring2.rotation.y = 1.1;
    yarn.add(ring2);

    const stringCurve = new THREE.CatmullRomCurve3([
      V(0.12, -0.2, 0.18), V(0.3, -0.29, 0.35), V(0.55, -0.3, 0.25), V(0.75, -0.3, 0.45)
    ]);
    yarn.add(new THREE.Mesh(new THREE.TubeGeometry(stringCurve, 16, 0.025, 8, false), createToonMat(colors.yarnPink)));
    group.add(yarn);

    const tail = new THREE.Group();
    tail.position.set(0, 0.12, -0.48);
    const tailCurve = new THREE.CatmullRomCurve3([
      V(0, 0, 0), V(0.4, -0.03, -0.1), V(0.72, 0.0, 0.15), V(0.82, 0.2, 0.45), V(0.72, 0.42, 0.6)
    ]);
    tail.add(new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 24, 0.08, 10, false), fur));
    [0.3, 0.5, 0.7].forEach(t => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.083, 0.022, 8, 16), stripe);
      ring.position.copy(tailCurve.getPoint(t));
      ring.quaternion.setFromUnitVectors(V(0, 0, 1), tailCurve.getTangent(t).normalize());
      tail.add(ring);
    });
    tail.add(sph(white, 0.085, 0.72, 0.42, 0.6));
    group.add(tail);

    return {
      mesh: group,
      head: head,
      tail: tail,
      yarn: yarn,
      paws: paws,
      animate: function (time) {
        group.scale.y = 1.0 + Math.sin(time * 2.8) * 0.02;
        tail.rotation.y = Math.sin(time * 3.2) * 0.12;
        tail.rotation.z = Math.cos(time * 2.0) * 0.05;
        head.rotation.y = Math.sin(time * 1.5) * 0.1;
        paws.forEach((paw, idx) => {
          paw.rotation.x = Math.sin(time * 4.5 + idx * Math.PI) * 0.12;
        });
        yarn.rotation.y = time * 0.8;
      }
    };
  }

  // ========================================================================
  // 3. FABRICADOR DEL AVE (COCO / PAJARITO TIERNO)
  // ========================================================================
  function buildBird() {
    const group = new THREE.Group();
    const bodyMat = createToonMat(colors.birdBody);
    const bellyMat = createToonMat(colors.birdBelly);
    const wingMat = createToonMat(colors.birdWings);
    const tailMat = createToonMat(colors.birdTail);
    const beakMat = createToonMat(colors.birdBeak);
    const feetMat = createToonMat(colors.birdFeet);
    const crestMat = createToonMat(colors.birdCrest);
    const blushMat = new THREE.MeshBasicMaterial({ color: colors.birdCheek, transparent: true, opacity: 0.85 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    const perchMat = createToonMat(0xBD8B62);
    const perch = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.2, 16), perchMat);
    perch.rotation.z = Math.PI / 2;
    perch.position.set(0, 0.32, 0);
    group.add(perch);

    [-0.16, 0.16].forEach(x => {
      const foot = new THREE.Group();
      foot.position.set(x, 0.42, 0.03);
      [-0.05, 0, 0.05].forEach(dx => {
        const toe = sph(feetMat, 0.042, dx, -0.04, 0.07, 0.7, 0.7, 1.4);
        foot.add(toe);
      });
      foot.add(sph(feetMat, 0.05, 0, 0, 0));
      group.add(foot);
    });

    const body = new THREE.Group();
    body.position.set(0, 0.95, 0);
    body.add(sph(bodyMat, 0.58, 0, 0.05, -0.04, 1.0, 1.05, 0.98));
    body.add(sph(bellyMat, 0.42, 0, 0.02, 0.28, 0.85, 0.98, 0.7));

    const head = new THREE.Group();
    head.position.set(0, 0.62, 0.08);
    head.add(sph(bodyMat, 0.46, 0, 0, 0, 1.06, 0.96, 1.0));

    const crest = new THREE.Group();
    crest.position.set(0, 0.44, -0.04);
    const c1 = sph(crestMat, 0.12, 0, 0.06, -0.04, 0.55, 1.4, 0.75);
    c1.rotation.x = -0.35;
    crest.add(c1);
    const c2 = sph(wingMat, 0.09, 0, 0.02, 0.06, 0.5, 1.1, 0.7);
    c2.rotation.x = 0.2;
    crest.add(c2);
    head.add(crest);

    [-0.2, 0.2].forEach(x => {
      const eye = sph(eyeMat, 0.085, x, 0.04, 0.38);
      eye.add(sph(sparkleMat, 0.03, 0.025, 0.028, 0.065));
      eye.add(sph(sparkleMat, 0.014, -0.022, -0.022, 0.07));
      head.add(eye);
    });

    head.add(sph(blushMat, 0.065, -0.3, -0.06, 0.32, 1.2, 0.7, 0.4));
    head.add(sph(blushMat, 0.065, 0.3, -0.06, 0.32, 1.2, 0.7, 0.4));

    const beakGeo = new THREE.ConeGeometry(0.1, 0.22, 16);
    beakGeo.rotateX(Math.PI / 2);
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.position.set(0, -0.05, 0.46);
    beak.scale.set(1.1, 0.85, 1.0);
    head.add(beak);

    body.add(head);

    const wings = [];
    [-1, 1].forEach(side => {
      const wingGroup = new THREE.Group();
      wingGroup.position.set(side * 0.52, 0.16, 0.02);

      const wing = sph(wingMat, 0.34, side * 0.04, -0.1, 0.04, 0.34, 1.15, 0.82);
      wing.rotation.z = side * 0.22;
      wing.rotation.y = side * 0.12;
      wingGroup.add(wing);

      const featherTip = sph(bodyMat, 0.18, side * 0.04, -0.32, 0.07, 0.3, 0.78, 0.6);
      wingGroup.add(featherTip);

      body.add(wingGroup);
      wings.push(wingGroup);
    });

    const tail = new THREE.Group();
    tail.position.set(0, -0.15, -0.5);
    [-0.08, 0, 0.08].forEach((dx, i) => {
      const feather = sph(tailMat, 0.15, dx, -0.12, -0.12 - i * 0.04, 0.4, 1.3, 0.24);
      feather.rotation.x = -0.65;
      feather.rotation.z = dx * 1.1;
      tail.add(feather);
    });
    body.add(tail);

    group.add(body);

    return {
      mesh: group,
      head: head,
      wings: wings,
      tail: tail,
      crest: crest,
      animate: function (time) {
        group.position.y = Math.sin(time * 3.5) * 0.03;
        group.scale.y = 1.0 + Math.sin(time * 3.5) * 0.018;

        head.rotation.z = Math.sin(time * 1.8) * 0.12;
        head.rotation.x = Math.sin(time * 2.4) * 0.05;

        wings.forEach((w, idx) => {
          const side = idx === 0 ? -1 : 1;
          w.rotation.z = side * Math.sin(time * 4.2) * 0.16;
          w.rotation.x = Math.cos(time * 4.2) * 0.08;
        });

        tail.rotation.y = Math.sin(time * 4.8) * 0.18;
        crest.rotation.z = Math.sin(time * 2.8) * 0.08;
      }
    };
  }

  // ========================================================================
  // 4. FABRICADOR DE OTRA ESPECIE (SIGNO '?' TIERNO Y ESTRELLITAS)
  // ========================================================================
  function buildOther() {
    const group = new THREE.Group();
    const markMat = createToonMat(colors.otherMark);
    const dotMat = createToonMat(colors.otherDot);
    const starMat = createToonMat(colors.otherStar);
    const pedestalMat = createToonMat(colors.otherPedestal);
    const rimMat = createToonMat(colors.otherRim);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xFFAEC0, transparent: true, opacity: 0.85 });

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.22, 32), pedestalMat);
    pedestal.position.set(0, 0.25, 0);
    group.add(pedestal);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.055, 12, 32), rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 0.35, 0);
    group.add(rim);

    const floater = new THREE.Group();
    floater.position.set(0, 0.5, 0);

    const dotFace = new THREE.Group();
    dotFace.position.set(0, 0.28, 0);
    dotFace.add(sph(dotMat, 0.22, 0, 0, 0, 1.1, 1.0, 1.0));

    [-0.085, 0.085].forEach(x => {
      const eye = sph(eyeMat, 0.042, x, 0.02, 0.2);
      eye.add(sph(sparkleMat, 0.015, 0.013, 0.014, 0.036));
      dotFace.add(eye);
    });

    dotFace.add(sph(blushMat, 0.038, -0.13, -0.03, 0.17, 1.2, 0.7, 0.4));
    dotFace.add(sph(blushMat, 0.038, 0.13, -0.03, 0.17, 1.2, 0.7, 0.4));
    floater.add(dotFace);

    const qCurve = new THREE.CatmullRomCurve3([
      V(-0.35, 1.35, 0),
      V(-0.3, 1.68, 0),
      V(0.0, 1.88, 0),
      V(0.35, 1.68, 0),
      V(0.35, 1.3, 0),
      V(0.08, 0.95, 0),
      V(0.0, 0.68, 0)
    ]);
    const hookMesh = new THREE.Mesh(new THREE.TubeGeometry(qCurve, 36, 0.13, 16, false), markMat);
    floater.add(hookMesh);

    floater.add(sph(markMat, 0.13, -0.35, 1.35, 0));
    floater.add(sph(markMat, 0.13, 0.0, 0.68, 0));

    const stars = [];
    const starConfigs = [
      { r: 0.75, theta: 0.2, y: 0.6, s: 0.12 },
      { r: 0.7, theta: 2.3, y: 1.2, s: 0.1 },
      { r: 0.8, theta: 4.1, y: 0.4, s: 0.13 },
      { r: 0.68, theta: 5.2, y: 1.4, s: 0.09 }
    ];

    starConfigs.forEach(cfg => {
      const star = new THREE.Group();
      const geo = new THREE.OctahedronGeometry(cfg.s, 0);
      geo.scale(1, 1.35, 0.6);
      const mesh = new THREE.Mesh(geo, starMat);
      star.add(mesh);
      star.userData = cfg;
      floater.add(star);
      stars.push(star);
    });

    group.add(floater);

    return {
      mesh: group,
      floater: floater,
      dotFace: dotFace,
      stars: stars,
      animate: function (time) {
        floater.position.y = 0.5 + Math.sin(time * 2.5) * 0.08;
        floater.rotation.y = Math.sin(time * 1.5) * 0.22;
        floater.rotation.z = Math.cos(time * 2.0) * 0.04;

        dotFace.scale.y = 1.0 + Math.sin(time * 3.8) * 0.05;

        stars.forEach((st, i) => {
          const cfg = st.userData;
          const curTheta = cfg.theta + time * (0.8 + i * 0.18);
          st.position.x = Math.cos(curTheta) * cfg.r;
          st.position.z = Math.sin(curTheta) * cfg.r;
          st.position.y = cfg.y + Math.sin(time * 2.8 + i) * 0.06;
          st.rotation.y = time * 2.0 + i;
          st.rotation.x = time * 1.4;
        });
      }
    };
  }

  // ========================================================================
  // 5. FABRICADOR DE PERSONAL RESPONSABLE - HOMBRE (DR. CARLOS / ANDRÉS)
  // Estilo cute Soft UI con hombros redondeados suaves (sin protuberancias),
  // rostro claro, dulce y expresivo, y cabello corto limpio sin diseño
  // ========================================================================
  function buildMan(custom = {}) {
    const group = new THREE.Group();
    const skinMat = createToonMat(colors.skinWarm);
    const skinShadowMat = createToonMat(colors.skinShadow);
    const hairMat = createToonMat(custom.hairColor || colors.hairDark);
    const coatMat = createToonMat(custom.scrubColor || colors.scrubDoctor);
    const collarMat = createToonMat(colors.coatWhite);
    const stethoMat = createToonMat(colors.stethoTube);
    const metalMat = createToonMat(colors.stethoMetal);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const mouthMat = new THREE.MeshBasicMaterial({ color: colors.mouthCute });
    const blushMat = new THREE.MeshBasicMaterial({ color: colors.blushCute, transparent: true, opacity: 0.7 });

    // 1. Torso y hombros redondeados suaves continuos (SIN protuberancias ni bolas raras)
    const torso = new THREE.Group();
    torso.position.set(0, 0.35, 0);

    // Cuerpo base suave
    const bodyCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.58, 0.68, 24), coatMat);
    bodyCyl.scale.set(1.0, 1.0, 0.72);
    torso.add(bodyCyl);

    // Cúpula superior de hombros suaves y continuos
    const shoulderDome = sph(coatMat, 0.46, 0, 0.28, 0, 1.28, 0.52, 0.74);
    torso.add(shoulderDome);

    // Cuello en V limpio
    torso.add(sph(collarMat, 0.16, 0, 0.42, 0.22, 1.1, 0.7, 0.5));
    torso.add(sph(skinMat, 0.12, 0, 0.45, 0.24, 0.9, 0.7, 0.5));

    // Fonendoscopio sutil y limpio
    const stethoCurve = new THREE.CatmullRomCurve3([
      V(-0.24, 0.46, 0.1),
      V(-0.2, 0.28, 0.24),
      V(-0.04, 0.12, 0.28),
      V(0.1, 0.22, 0.25),
      V(0.15, 0.08, 0.28)
    ]);
    const stethoTube = new THREE.Mesh(new THREE.TubeGeometry(stethoCurve, 20, 0.02, 8, false), stethoMat);
    torso.add(stethoTube);

    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16), metalMat);
    bell.rotation.x = Math.PI / 2;
    bell.position.set(0.15, 0.07, 0.29);
    torso.add(bell);

    group.add(torso);

    // 2. Cuello limpio
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.26, 20), skinMat);
    neck.position.set(0, 0.88, 0);
    group.add(neck);

    // 3. Cabeza y rostro cute
    const head = new THREE.Group();
    head.position.set(0, 1.35, 0.05);

    // Esfera suave del rostro
    head.add(sph(skinMat, 0.48, 0, 0, 0, 1.02, 1.06, 1.0));

    // 4. Cabello CORTO limpio sin diseño (solo en la parte posterior y superior, NUNCA sobre la cara)
    const hair = new THREE.Group();
    // Casquete de pelo detrás de la cabeza
    hair.add(sph(hairMat, 0.49, 0, 0.08, -0.06, 1.02, 1.04, 0.96));

    // Patillas limpias al lado de las orejas
    [-0.47, 0.47].forEach(x => {
      hair.add(sph(hairMat, 0.08, x, -0.02, 0.05, 0.5, 1.2, 0.6));
    });

    // Remate corto superior
    hair.add(sph(hairMat, 0.18, 0, 0.48, 0.1, 1.3, 0.4, 0.6));
    head.add(hair);

    // Orejitas
    [-0.47, 0.47].forEach(x => {
      head.add(sph(skinMat, 0.1, x, -0.02, 0, 0.45, 0.85, 0.65));
    });

    // 5. Ojos anime adorables con destellos
    [-0.19, 0.19].forEach(x => {
      const eye = sph(eyeMat, 0.085, x, 0.05, 0.45);
      eye.add(sph(sparkleMat, 0.03, 0.024, 0.025, 0.065));
      eye.add(sph(sparkleMat, 0.015, -0.022, -0.02, 0.075));
      head.add(eye);
    });

    // Cejitas amables
    [-0.19, 0.19].forEach(x => {
      const brow = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.13, 8), hairMat);
      brow.rotation.z = Math.PI / 2 + (x > 0 ? -0.1 : 0.1);
      brow.position.set(x, 0.18, 0.44);
      head.add(brow);
    });

    // Naricita pequeña
    head.add(sph(skinShadowMat, 0.038, 0, -0.04, 0.48, 1, 0.85, 1));

    // Sonrisa tierna
    const smileCurve = new THREE.CatmullRomCurve3([
      V(-0.08, -0.14, 0.44),
      V(0, -0.18, 0.46),
      V(0.08, -0.14, 0.44)
    ]);
    const smile = new THREE.Mesh(new THREE.TubeGeometry(smileCurve, 12, 0.018, 6, false), mouthMat);
    head.add(smile);

    // Rubor suave
    head.add(sph(blushMat, 0.075, -0.28, -0.07, 0.42, 1.25, 0.7, 0.4));
    head.add(sph(blushMat, 0.075, 0.28, -0.07, 0.42, 1.25, 0.7, 0.4));

    group.add(head);

    return {
      mesh: group,
      head: head,
      torso: torso,
      animate: function (time) {
        group.scale.y = 1.0 + Math.sin(time * 2.8) * 0.012;
        head.rotation.y = Math.sin(time * 1.5) * 0.08;
        head.rotation.z = Math.sin(time * 2.0) * 0.025;
        head.rotation.x = Math.sin(time * 2.8) * 0.015;
      }
    };
  }

  // ========================================================================
  // 6. FABRICADOR DE PERSONAL RESPONSABLE - MUJER (DRA. DIANA GÓMEZ)
  // Estilo cute Soft UI con hombros redondeados suaves (sin protuberancias),
  // rostro claro, dulce y expresivo, y cabello recogido elegante
  // ========================================================================
  function buildWoman(custom = {}) {
    const group = new THREE.Group();
    const skinMat = createToonMat(colors.skinWarm);
    const skinShadowMat = createToonMat(colors.skinShadow);
    const hairMat = createToonMat(custom.hairColor || colors.hairChestnut);
    const coatMat = createToonMat(custom.scrubColor || colors.scrubDiana);
    const collarMat = createToonMat(colors.coatWhite);
    const stethoMat = createToonMat(colors.stethoTube);
    const metalMat = createToonMat(colors.stethoMetal);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x241B33 });
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const mouthMat = new THREE.MeshBasicMaterial({ color: colors.mouthCute });
    const blushMat = new THREE.MeshBasicMaterial({ color: colors.blushCute, transparent: true, opacity: 0.75 });

    // 1. Torso y hombros redondeados suaves continuos (SIN protuberancias ni bolas raras)
    const torso = new THREE.Group();
    torso.position.set(0, 0.35, 0);

    const bodyCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.56, 0.68, 24), coatMat);
    bodyCyl.scale.set(1.0, 1.0, 0.7);
    torso.add(bodyCyl);

    const shoulderDome = sph(coatMat, 0.44, 0, 0.28, 0, 1.25, 0.52, 0.72);
    torso.add(shoulderDome);

    // Cuello en V
    torso.add(sph(collarMat, 0.15, 0, 0.42, 0.22, 1.1, 0.7, 0.5));
    torso.add(sph(skinMat, 0.11, 0, 0.45, 0.24, 0.9, 0.7, 0.5));

    // Fonendoscopio
    const stethoCurve = new THREE.CatmullRomCurve3([
      V(-0.24, 0.46, 0.1),
      V(-0.2, 0.28, 0.24),
      V(-0.04, 0.12, 0.28),
      V(0.1, 0.22, 0.25),
      V(0.15, 0.08, 0.28)
    ]);
    const stethoTube = new THREE.Mesh(new THREE.TubeGeometry(stethoCurve, 20, 0.02, 8, false), stethoMat);
    torso.add(stethoTube);

    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16), metalMat);
    bell.rotation.x = Math.PI / 2;
    bell.position.set(0.15, 0.07, 0.29);
    torso.add(bell);

    group.add(torso);

    // 2. Cuello limpio
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.26, 20), skinMat);
    neck.position.set(0, 0.88, 0);
    group.add(neck);

    // 3. Cabeza y rostro cute
    const head = new THREE.Group();
    head.position.set(0, 1.35, 0.05);
    head.add(sph(skinMat, 0.47, 0, 0, 0, 1.0, 1.05, 1.0));

    // 4. Cabello femenino (detrás y a los costados, NUNCA sobre la cara)
    const hair = new THREE.Group();
    hair.add(sph(hairMat, 0.48, 0, 0.08, -0.06, 1.02, 1.04, 0.96));

    // Mechones laterales a los lados de la cabeza (no en la cara)
    [-0.45, 0.45].forEach(side => {
      hair.add(sph(hairMat, 0.1, side, -0.08, 0.08, 0.6, 1.4, 0.6));
    });

    // Moño / coletero recogido atrás
    const bun = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.05, 10, 20), createToonMat(colors.dogCollar));
    bun.position.set(0, 0.12, -0.46);
    hair.add(bun);
    hair.add(sph(hairMat, 0.18, 0, -0.06, -0.5, 0.85, 1.2, 0.8));

    head.add(hair);

    // Orejitas
    [-0.45, 0.45].forEach(x => {
      head.add(sph(skinMat, 0.095, x, -0.02, 0, 0.45, 0.85, 0.65));
    });

    // 5. Ojos anime adorables
    [-0.18, 0.18].forEach(x => {
      const eye = sph(eyeMat, 0.085, x, 0.05, 0.45);
      eye.add(sph(sparkleMat, 0.03, 0.024, 0.025, 0.065));
      eye.add(sph(sparkleMat, 0.015, -0.022, -0.02, 0.075));
      head.add(eye);
    });

    // Cejas finas arqueadas
    [-0.18, 0.18].forEach(x => {
      const brow = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.13, 8), hairMat);
      brow.rotation.z = Math.PI / 2 + (x > 0 ? -0.12 : 0.12);
      brow.position.set(x, 0.18, 0.44);
      head.add(brow);
    });

    // Naricita pequeña
    head.add(sph(skinShadowMat, 0.035, 0, -0.04, 0.48, 1, 0.85, 1));

    // Sonrisa tierna
    const smileCurve = new THREE.CatmullRomCurve3([
      V(-0.08, -0.14, 0.44),
      V(0, -0.18, 0.46),
      V(0.08, -0.14, 0.44)
    ]);
    const smile = new THREE.Mesh(new THREE.TubeGeometry(smileCurve, 12, 0.018, 6, false), mouthMat);
    head.add(smile);

    // Rubor suave
    head.add(sph(blushMat, 0.075, -0.27, -0.07, 0.42, 1.25, 0.7, 0.4));
    head.add(sph(blushMat, 0.075, 0.27, -0.07, 0.42, 1.25, 0.7, 0.4));

    group.add(head);

    return {
      mesh: group,
      head: head,
      torso: torso,
      animate: function (time) {
        group.scale.y = 1.0 + Math.sin(time * 2.8) * 0.012;
        head.rotation.y = Math.sin(time * 1.6) * 0.09;
        head.rotation.z = Math.sin(time * 2.2) * 0.03;
        head.rotation.x = Math.sin(time * 2.8) * 0.015;
      }
    };
  }

  // ========================================================================
  // MOTOR DE VISORES 3D EMBEBIDOS (SIN ROTACIÓN MANUAL, SOLO ANIMACIÓN)
  // ========================================================================
  const activeViewers = [];
  let isSharedLoopStarted = false;
  const clock = new THREE.Clock();

  function startSharedLoop() {
    if (isSharedLoopStarted) return;
    isSharedLoopStarted = true;

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      activeViewers.forEach(v => {
        if (!v.container || !document.body.contains(v.container)) return;
        if (v.container.offsetParent === null && v.container.offsetWidth === 0) return;

        if (v.activePet && v.activePet.animate) {
          v.activePet.animate(time);
        }

        v.camera.position.x = Math.sin(time * 0.5) * 0.12;
        v.camera.lookAt(v.targetLookAt);

        v.renderer.render(v.scene, v.camera);
      });
    }

    renderLoop();
  }

  function createEmbeddedViewer(containerId, initialType = 'dog', config = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    const width = config.width || container.clientWidth || 280;
    const height = config.height || container.clientHeight || 250;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(config.fov || 38, width / height, 0.1, 50);
    const camY = config.camY || 1.35;
    const camZ = config.camZ || 5.0;
    camera.position.set(0, camY, camZ);
    const targetLookAt = V(0, config.targetY || 1.15, 0);
    camera.lookAt(targetLookAt);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.height = 'auto';
    container.appendChild(renderer.domElement);

    // Iluminación suave equilibrada
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xEBE4FD, 0.68);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xFFF1E4, 0.55);
    dirLight.position.set(3.5, 5, 4);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xD8CCFC, 0.32);
    fillLight.position.set(-3, 3, -2);
    scene.add(fillLight);

    // Instancias de modelos: Mascotas y Humanos
    const dogInstance = buildDog();
    const catInstance = buildCat();
    const birdInstance = buildBird();
    const otherInstance = buildOther();

    // Personal Masculino y Femenino con uniformes específicos
    const manDoctorInstance = buildMan({ scrubColor: colors.scrubDoctor });
    const manAndresInstance = buildMan({ scrubColor: colors.scrubAndres });
    const womanInstance = buildWoman({ scrubColor: colors.scrubDiana });

    const scale = config.scale || 0.96;
    dogInstance.mesh.scale.set(scale, scale, scale);
    catInstance.mesh.scale.set(scale, scale, scale);
    birdInstance.mesh.scale.set(scale, scale, scale);
    otherInstance.mesh.scale.set(scale, scale, scale);
    manDoctorInstance.mesh.scale.set(scale, scale, scale);
    manAndresInstance.mesh.scale.set(scale, scale, scale);
    womanInstance.mesh.scale.set(scale, scale, scale);

    scene.add(dogInstance.mesh);
    scene.add(catInstance.mesh);
    scene.add(birdInstance.mesh);
    scene.add(otherInstance.mesh);
    scene.add(manDoctorInstance.mesh);
    scene.add(manAndresInstance.mesh);
    scene.add(womanInstance.mesh);

    const viewer = {
      container: container,
      scene: scene,
      camera: camera,
      renderer: renderer,
      targetLookAt: targetLookAt,
      dog: dogInstance,
      cat: catInstance,
      bird: birdInstance,
      other: otherInstance,
      manDoctor: manDoctorInstance,
      manAndres: manAndresInstance,
      woman: womanInstance,
      activePet: null,
      setType: function (type) {
        let normalized = 'dog';
        if (type === 'cat' || type === 'gato' || type === 'felino') normalized = 'cat';
        else if (type === 'bird' || type === 'ave') normalized = 'bird';
        else if (type === 'other' || type === 'otra' || type === 'otro' || type === 'otra especie') normalized = 'other';
        else if (type === 'carlos' || type === 'man' || type === 'hombre') normalized = 'carlos';
        else if (type === 'andres') normalized = 'andres';
        else if (type === 'diana' || type === 'woman' || type === 'mujer') normalized = 'woman';

        this.dog.mesh.visible = (normalized === 'dog');
        this.cat.mesh.visible = (normalized === 'cat');
        this.bird.mesh.visible = (normalized === 'bird');
        this.other.mesh.visible = (normalized === 'other');
        this.manDoctor.mesh.visible = (normalized === 'carlos');
        this.manAndres.mesh.visible = (normalized === 'andres');
        this.woman.mesh.visible = (normalized === 'woman');

        if (normalized === 'cat') this.activePet = this.cat;
        else if (normalized === 'bird') this.activePet = this.bird;
        else if (normalized === 'other') this.activePet = this.other;
        else if (normalized === 'carlos') this.activePet = this.manDoctor;
        else if (normalized === 'andres') this.activePet = this.manAndres;
        else if (normalized === 'woman') this.activePet = this.woman;
        else this.activePet = this.dog;
      },
      resize: function () {
        const w = container.clientWidth || width;
        const h = container.clientHeight || height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    };

    viewer.setType(initialType);
    activeViewers.push(viewer);
    startSharedLoop();

    window.addEventListener('resize', () => viewer.resize());
    return viewer;
  }

  // ========================================================================
  // API GLOBAL Y REGISTRO EN PANTALLAS
  // ========================================================================
  const Pet3D = {
    viewers: {},

    init: function () {
      if (typeof THREE === 'undefined') {
        console.warn('Three.js no está cargado todavía.');
        return;
      }

      // 1. Visor en Pantalla de Registro de Mascotas
      const regContainer = document.getElementById('pet-3d-reg-canvas');
      if (regContainer) {
        this.viewers.registration = createEmbeddedViewer('pet-3d-reg-canvas', 'dog', {
          width: 280,
          height: 250,
          camZ: 5.0,
          camY: 1.35,
          targetY: 1.15,
          scale: 0.96
        });
      }

      // 2. Visor en Pantalla de Gestión de Planes
      const planContainer = document.getElementById('pet-3d-plan-canvas');
      if (planContainer) {
        this.viewers.plan = createEmbeddedViewer('pet-3d-plan-canvas', 'dog', {
          width: 240,
          height: 180,
          camZ: 4.9,
          camY: 1.3,
          scale: 0.95
        });
      }

      // 3. Mini Avatar 3D en Agenda de Citas
      const apptContainer = document.getElementById('pet-3d-appt-avatar');
      if (apptContainer) {
        this.viewers.appointment = createEmbeddedViewer('pet-3d-appt-avatar', 'dog', {
          width: 64,
          height: 64,
          fov: 34,
          camZ: 3.8,
          camY: 1.85,
          targetY: 1.85,
          scale: 0.95
        });
      }

      // 4. Mini Avatar 3D en Modal de Tratamientos
      const treatContainer = document.getElementById('pet-3d-treatment-avatar');
      if (treatContainer) {
        this.viewers.treatment = createEmbeddedViewer('pet-3d-treatment-avatar', 'dog', {
          width: 58,
          height: 58,
          fov: 34,
          camZ: 3.8,
          camY: 1.85,
          targetY: 1.85,
          scale: 0.95
        });
      }

      // 5. Mini Avatares 3D en Tarjetas de la Lista de Personal (Hombre y Mujer)
      const staff1 = document.getElementById('staff-card-3d-1');
      if (staff1) {
        this.viewers.staffCard1 = createEmbeddedViewer('staff-card-3d-1', 'carlos', {
          width: 48,
          height: 48,
          fov: 36,
          camZ: 3.25,
          camY: 1.25,
          targetY: 1.18,
          scale: 0.98
        });
      }

      const staff2 = document.getElementById('staff-card-3d-2');
      if (staff2) {
        this.viewers.staffCard2 = createEmbeddedViewer('staff-card-3d-2', 'diana', {
          width: 48,
          height: 48,
          fov: 36,
          camZ: 3.25,
          camY: 1.25,
          targetY: 1.18,
          scale: 0.98
        });
      }

      const staff3 = document.getElementById('staff-card-3d-3');
      if (staff3) {
        this.viewers.staffCard3 = createEmbeddedViewer('staff-card-3d-3', 'andres', {
          width: 48,
          height: 48,
          fov: 36,
          camZ: 3.25,
          camY: 1.25,
          targetY: 1.18,
          scale: 0.98
        });
      }

      // 6. Avatar 3D Grande en Ficha de Personal Responsable
      const staffDossier = document.getElementById('staff-dossier-3d-canvas');
      if (staffDossier) {
        this.viewers.staffDossier = createEmbeddedViewer('staff-dossier-3d-canvas', 'carlos', {
          width: 84,
          height: 84,
          fov: 35,
          camZ: 3.15,
          camY: 1.25,
          targetY: 1.18,
          scale: 1.0
        });
      }

      // 7. Mini Avatar 3D en Modal de Edición de Personal
      const staffEdit = document.getElementById('staff-edit-3d-avatar');
      if (staffEdit) {
        this.viewers.staffEdit = createEmbeddedViewer('staff-edit-3d-avatar', 'carlos', {
          width: 58,
          height: 58,
          fov: 36,
          camZ: 3.25,
          camY: 1.25,
          targetY: 1.18,
          scale: 0.98
        });
      }
    },

    setRegistrationPet: function (type) {
      if (this.viewers.registration) {
        this.viewers.registration.setType(type);
      }
    },

    setPlanPet: function (type) {
      if (this.viewers.plan) {
        this.viewers.plan.setType(type);
      }
    },

    setApptPet: function (type) {
      if (this.viewers.appointment) {
        this.viewers.appointment.setType(type);
      }
    },

    setTreatmentPet: function (type) {
      if (this.viewers.treatment) {
        this.viewers.treatment.setType(type);
      }
    },

    setStaffDossier: function (type) {
      if (this.viewers.staffDossier) {
        this.viewers.staffDossier.setType(type);
      }
    },

    setStaffEdit: function (type) {
      if (this.viewers.staffEdit) {
        this.viewers.staffEdit.setType(type);
      }
    },

    selectSpecies: function (type) {
      this.setRegistrationPet(type);

      const pillMap = {
        dog: 'btn-reg-dog',
        perro: 'btn-reg-dog',
        cat: 'btn-reg-cat',
        gato: 'btn-reg-cat',
        bird: 'btn-reg-bird',
        ave: 'btn-reg-bird',
        other: 'btn-reg-other',
        otra: 'btn-reg-other',
        otro: 'btn-reg-other'
      };

      const allBtns = ['btn-reg-dog', 'btn-reg-cat', 'btn-reg-bird', 'btn-reg-other'];
      allBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
      });

      const activeId = pillMap[type] || 'btn-reg-dog';
      const activeBtn = document.getElementById(activeId);
      if (activeBtn) activeBtn.classList.add('active');

      const speciesSelect = document.getElementById('pet-species');
      if (speciesSelect) {
        const selectMap = {
          dog: 'perro',
          perro: 'perro',
          cat: 'gato',
          gato: 'gato',
          bird: 'ave',
          ave: 'ave',
          other: 'otra',
          otra: 'otra',
          otro: 'otra'
        };
        const targetVal = selectMap[type] || 'perro';
        if (speciesSelect.value !== targetVal) {
          speciesSelect.value = targetVal;
        }
      }
    }
  };

  window.Pet3D = Pet3D;

  document.addEventListener('DOMContentLoaded', function () {
    Pet3D.init();
  });

})();
