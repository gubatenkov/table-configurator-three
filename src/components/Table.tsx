import {
  MeshStandardMaterial,
  MeshBasicMaterial,
  CylinderGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  TextureLoader,
  BoxGeometry,
  Vector3,
  Color,
  Mesh,
} from 'three'
import { useEffect, useMemo, useRef, FC } from 'react'

import { Config } from '../data'

type Props = {
  settings: Config
}
/**
 * Each geometry and material means additional
 * overhead for the GPU. Here we re-use resources
 * cos we know that they will repeat.
 **/
const legsMaterial = new MeshStandardMaterial()
const textureLoader = new TextureLoader()

const Table: FC<Props> = ({ settings: { countertop, tablelegs } }) => {
  const tableRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)
  /**
   * Create new legsGeometry only when its
   * props is changed
   **/
  const legsGeometry = useMemo(
    () =>
      new CylinderGeometry(
        tablelegs.size,
        tablelegs.size,
        tablelegs.height,
        tablelegs.style === 'square' ? 4 : 24
      ),
    [tablelegs.style, tablelegs.size, tablelegs.size, tablelegs.height]
  )
  const legsPositions = useMemo(
    () => [
      [
        countertop.width / 2 - 1,
        -countertop.depth / 2,
        countertop.height / 2 - 1,
      ],
      [
        countertop.width / 2 - 1,
        -countertop.depth / 2,
        -countertop.height / 2 + 1,
      ],
      [
        -countertop.width / 2 + 1,
        -countertop.depth / 2,
        -countertop.height / 2 + 1,
      ],
      [
        -countertop.width / 2 + 1,
        -countertop.depth / 2,
        countertop.height / 2 - 1,
      ],
    ],
    [countertop.width, countertop.height, countertop.depth]
  )

  const handleCountertopTexture = () => {
    textureLoader.load(countertop.texture, (t) => {
      if (!tableRef.current) return
      t.colorSpace = SRGBColorSpace
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.setX(countertop.textureRepeatX)
      t.repeat.setY(countertop.textureRepeatY)
      tableRef.current.material.map = t
      tableRef.current.material.needsUpdate = true
    })
  }

  const resetCountertopTexture = () => {
    if (!tableRef.current) return
    tableRef.current.material.map = null
    tableRef.current.material.needsUpdate = true
  }

  const handleLegsTexture = () => {
    textureLoader.load(tablelegs.texture, (t) => {
      t.colorSpace = SRGBColorSpace
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.setX(tablelegs.textureRepeatX)
      t.repeat.setY(tablelegs.textureRepeatY)
      legsMaterial.map = t
      legsMaterial.needsUpdate = true
    })
  }

  const resetLegsTexture = () => {
    legsMaterial.map = null
    legsMaterial.needsUpdate = true
  }

  /**
   * Effect applies texture to Countertop material and update
   * it settings if texture has been already uploaded else
   * reset texture
   **/
  useEffect(() => {
    // when texture exist
    if (countertop.texture.length > 0) {
      handleCountertopTexture()
    } else if (countertop.texture.length === 0) {
      resetCountertopTexture()
    }
  }, [countertop.texture, countertop.textureRepeatX, countertop.textureRepeatY])

  // same just for table legs
  useEffect(() => {
    // when texture exist
    if (tablelegs.texture.length > 0) {
      handleLegsTexture()
    } else if (tablelegs.texture.length === 0) {
      resetLegsTexture()
    }
  }, [tablelegs.texture, tablelegs.textureRepeatX, tablelegs.textureRepeatY])

  // update color of single material
  useEffect(() => {
    legsMaterial.color = new Color(tablelegs.color)
  }, [tablelegs.color])

  return (
    <>
      <mesh rotation-x={Math.PI / 2} name="Countertop" ref={tableRef}>
        <meshStandardMaterial color={countertop.color} />
        <boxGeometry
          args={[countertop.width, countertop.height, countertop.depth]}
        />
      </mesh>

      <group position={[0, -tablelegs.height / 2, 0]} name="Legs">
        {legsPositions.map((positions, idx) => {
          return (
            <mesh
              position={new Vector3(...positions)}
              rotation-y={Math.PI / 4}
              material={legsMaterial}
              geometry={legsGeometry}
              key={idx}
            />
          )
        })}
      </group>
    </>
  )
}
export default Table
