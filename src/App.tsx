import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { ChangeEvent, useCallback, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid } from '@mui/material'
// import { useControls } from 'leva'

import {
  handleJSONDownload,
  handleScreenshot,
  handleJSONUpload,
} from './utils/functions'
import { initialConfig, ConfigValue, type Config, ConfigKey } from './data'
import SettingsOverlay from './components/SettingsOverlay'
import Table from './components/Table'

const cameraProps = {
  aspect: window.innerWidth / window.innerHeight,
  near: 0.01,
  far: 60,
  fov: 50,
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [config, setConfig] = useState(initialConfig)

  const handleCountertopTextureUpload = useCallback((texture: string) => {
    setConfig(
      (prevConfig) =>
        ({
          tablelegs: {
            ...prevConfig.tablelegs,
          },
          countertop: { ...prevConfig.countertop, texture },
        }) satisfies Config
    )
  }, [])

  const handleLegsTextureUpload = useCallback((texture: string) => {
    setConfig(
      (prevConfig) =>
        ({
          tablelegs: {
            ...prevConfig.tablelegs,
            texture,
          },
          countertop: { ...prevConfig.countertop },
        }) satisfies Config
    )
  }, [])

  const handleUpdateSettings = useCallback(
    (key: ConfigKey, value: ConfigValue) => {
      setConfig(
        (prevConfig) => ({ ...prevConfig, [key]: value }) satisfies Config
      )
    },
    []
  )

  const handleConfigDownload = () => {
    handleJSONDownload(config)
  }

  const handleConfigUpload = (e: ChangeEvent<HTMLInputElement>) => {
    handleJSONUpload(e, setConfig)
  }

  const handleResetSettings = () => setConfig(structuredClone(initialConfig))

  return (
    <Grid height={'100%'} container>
      <Grid xs={9} item>
        <Canvas
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          camera={cameraProps}
          ref={canvasRef}
        >
          <OrbitControls target={[0, 0, 0]} maxDistance={50} minDistance={10} />
          <PerspectiveCamera position={[10, 10, 10]} makeDefault />
          <color attach={'background'} args={['lightgrey']} />
          <ambientLight color="white" intensity={1} />
          <gridHelper
            position={[
              0,
              -config.tablelegs.height - config.countertop.depth / 2,
              0,
            ]}
            args={[100, 100, 100]}
          />
          <Table settings={config} />
          <directionalLight
            position={[20, 20, 15]}
            intensity={10}
            color="white"
          />
        </Canvas>
      </Grid>
      <Grid height={'100%'} xs={3} item>
        <SettingsOverlay
          onCountertopTextureUpload={handleCountertopTextureUpload}
          onScreenshot={() => handleScreenshot(canvasRef.current)}
          onLegsTextureUpload={handleLegsTextureUpload}
          onConfigDownload={handleConfigDownload}
          onConfigUpload={handleConfigUpload}
          onUpdate={handleUpdateSettings}
          onReset={handleResetSettings}
          settings={config}
        />
      </Grid>
    </Grid>
  )
}

export default App
