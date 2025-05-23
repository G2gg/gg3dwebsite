import { useCursor, useTexture, Environment, Float, OrbitControls, Loader } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { atom, useAtom } from "jotai";
import {
  Bone, BoxGeometry, Color, Float32BufferAttribute, MathUtils,
  MeshStandardMaterial, Skeleton, SkinnedMesh, SRGBColorSpace,
  Uint16BufferAttribute, Vector3
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";

// Constants and configurations
const pictures = [
  "page1", "page2", "page3", "page4", "page5",
  "page6", "blank", "blank", "blank", "blank",
  "blank", "blank", "blank", "blank", "blank",
  "blank"
];

const pageAtom = atom(0);
const pages = [{ front: "book-cover", back: pictures[0] }];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

// Book geometry setup
const easingFactor = 0.5; // Controls the speed of the easing
const easingFactorFold = 0.3; // Controls the speed of the easing
const insideCurveStrength = 0.18; // Controls the strength of the curve
const outsideCurveStrength = 0.05; // Controls the strength of the curve
const turningCurveStrength = 0.09; // Controls the strength of the curve

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2);
pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndexes, 4));
pageGeometry.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

// Preload textures
pages.forEach((page) => {
  useTexture.preload(`textures/book/${page.front}.jpg`);
  useTexture.preload(`textures/book/${page.back}.jpg`);
  useTexture.preload(`textures/book/book-cover-roughness.jpg`);
});

const Page = ({ number, front, back, page, opened, bookClosed, ...props }) => {
  const [picture, picture2, pictureRoughness] = useTexture([
    `textures/book/${front}.jpg`,
    `textures/book/${back}.jpg`,
    ...(number === 0 || number === pages.length - 1
      ? [`textures/book/book-cover-roughness.jpg`]
      : []),
  ]);
  
  // ... [Previous Page component code remains the same]
  // [Include all the useFrame, useMemo, and other logic from the original Page component]
  picture.colorSpace = picture2.colorSpace = SRGBColorSpace;
    const group = useRef();
    const turnedAt = useRef(0);
    const lastOpened = useRef(opened);
  
    const skinnedMeshRef = useRef();
  
    const manualSkinnedMesh = useMemo(() => {
      const bones = [];
      for (let i = 0; i <= PAGE_SEGMENTS; i++) {
        let bone = new Bone();
        bones.push(bone);
        if (i === 0) {
          bone.position.x = 0;
        } else {
          bone.position.x = SEGMENT_WIDTH;
        }
        if (i > 0) {
          bones[i - 1].add(bone); // attach the new bone to the previous bone
        }
      }
      const skeleton = new Skeleton(bones);
  
      const materials = [
        ...pageMaterials,
        new MeshStandardMaterial({
          color: whiteColor,
          map: picture,
          ...(number === 0
            ? {
                roughnessMap: pictureRoughness,
              }
            : {
                roughness: 0.1,
              }),
          emissive: emissiveColor,
          emissiveIntensity: 0,
        }),
        new MeshStandardMaterial({
          color: whiteColor,
          map: picture2,
          ...(number === pages.length - 1
            ? {
                roughnessMap: pictureRoughness,
              }
            : {
                roughness: 0.1,
              }),
          emissive: emissiveColor,
          emissiveIntensity: 0,
        }),
      ];
      const mesh = new SkinnedMesh(pageGeometry, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      mesh.add(skeleton.bones[0]);
      mesh.bind(skeleton);
      return mesh;
    }, []);
  
    // useHelper(skinnedMeshRef, SkeletonHelper, "red");
  
    useFrame((_, delta) => {
      if (!skinnedMeshRef.current) {
        return;
      }
  
      const emissiveIntensity = highlighted ? 0.22 : 0;
      skinnedMeshRef.current.material[4].emissiveIntensity =
        skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
          skinnedMeshRef.current.material[4].emissiveIntensity,
          emissiveIntensity,
          0.1
        );
  
      if (lastOpened.current !== opened) {
        turnedAt.current = +new Date();
        lastOpened.current = opened;
      }
      let turningTime = Math.min(400, new Date() - turnedAt.current) / 400;
      turningTime = Math.sin(turningTime * Math.PI);
  
      let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
      if (!bookClosed) {
        targetRotation += degToRad(number * 0.8);
      }
  
      const bones = skinnedMeshRef.current.skeleton.bones;
      for (let i = 0; i < bones.length; i++) {
        const target = i === 0 ? group.current : bones[i];
  
        const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
        const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
        const turningIntensity =
          Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;
        let rotationAngle =
          insideCurveStrength * insideCurveIntensity * targetRotation -
          outsideCurveStrength * outsideCurveIntensity * targetRotation +
          turningCurveStrength * turningIntensity * targetRotation;
        let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
        if (bookClosed) {
          if (i === 0) {
            rotationAngle = targetRotation;
            foldRotationAngle = 0;
          } else {
            rotationAngle = 0;
            foldRotationAngle = 0;
          }
        }
        easing.dampAngle(
          target.rotation,
          "y",
          rotationAngle,
          easingFactor,
          delta
        );
  
        const foldIntensity =
          i > 8
            ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
            : 0;
        easing.dampAngle(
          target.rotation,
          "x",
          foldRotationAngle * foldIntensity,
          easingFactorFold,
          delta
        );
      }
    });
  
    const [_, setPage] = useAtom(pageAtom);
    const [highlighted, setHighlighted] = useState(false);
    useCursor(highlighted);

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

const Book = () => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeout;
    const goToPage = () => {
      setDelayedPage((delayedPage) => {
        if (page === delayedPage) return delayedPage;
        timeout = setTimeout(
          () => goToPage(),
          Math.abs(page - delayedPage) > 2 ? 50 : 150
        );
        return page > delayedPage ? delayedPage + 1 : delayedPage - 1;
      });
    };
    goToPage();
    return () => clearTimeout(timeout);
  }, [page]);

  useEffect(() => {
    const audio = new Audio("audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <group rotation-y={-Math.PI / 2}>
      {pages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};

const BookUI = () => {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <div className="w-full overflow-auto flex justify-center mt-4">
      <div className="overflow-auto flex items-center gap-4 max-w-full p-4">
        {pages.map((_, index) => (
          <button
            key={index}
            className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-sm uppercase shrink-0 border ${
              index === page ? "bg-white/90 text-black" : "bg-black/30 text-white"
            }`}
            onClick={() => setPage(index)}
          >
            {index === 0 ? "Cover" : `Page ${index}`}
          </button>
        ))}
        <button
          className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-sm uppercase shrink-0 border ${
            page === pages.length ? "bg-white/90 text-black" : "bg-black/30 text-white"
          }`}
          onClick={() => setPage(pages.length)}
        >
          Back Cover
        </button>
      </div>
    </div>
  );
};

const BookSection = () => {
  return (
    <section className="c-space my-20">
      <p className="head-text">Explore My Book</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <div className="w-full sm:h-[400px] h-fit relative">
              <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
                <Suspense fallback={null}>
                  <group position-y={0}>
                    <Float
                      rotation-x={-Math.PI / 4}
                      floatIntensity={1}
                      speed={2}
                      rotationIntensity={2}
                    >
                      <Book />
                    </Float>
                    <OrbitControls />
                    <Environment preset="studio" />
                    <directionalLight
                      position={[2, 5, 2]}
                      intensity={2.5}
                      castShadow
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                      shadow-bias={-0.0001}
                    />
                    <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
                      <planeGeometry args={[100, 100]} />
                      <shadowMaterial transparent opacity={0.2} />
                    </mesh>
                  </group>
                </Suspense>
              </Canvas>
              <Loader />
            </div>
            <BookUI />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;