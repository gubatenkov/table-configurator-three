import {
  FormControl,
  InputLabel,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Select,
  Button,
  Grid,
  Box,
} from '@mui/material'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { MuiColorInputValue, MuiColorInput } from 'mui-color-input'
import { ChangeEvent, FC } from 'react'

import {
  CountertopSettings,
  TablelegsSettings,
  ConfigValue,
  ConfigKey,
  Config,
} from '../data'
import { encodeImageFileAsURL } from '../utils/functions'

type Props = {
  onConfigUpload: (e: ChangeEvent<HTMLInputElement>) => void
  onUpdate: (key: ConfigKey, value: ConfigValue) => void
  onCountertopTextureUpload: (texture: string) => void
  onLegsTextureUpload: (texture: string) => void
  onConfigDownload: () => void
  onScreenshot: () => void
  onReset: () => void
  settings: Config
}

const SettingsOverlay: FC<Props> = ({
  onCountertopTextureUpload: handleCountertopTextureUpload,
  onLegsTextureUpload: handleLegsTextureUpload,
  onConfigDownload: handleConfigDownload,
  onConfigUpload: handleConfigUpload,
  onScreenshot: handleScreenshot,
  onUpdate: handleUpdate,
  onReset: handleReset,
  settings,
}) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Box height={'100%'}>
      <Box
        sx={{
          height: 'calc(100% - 12rem)',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Grid spacing={2} container>
          <Grid xs={12} item>
            <Typography component="h2" variant="h4">
              Сountertop
            </Typography>
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('countertop', {
                    ...settings.countertop,
                    width: Number(e.target.value),
                  } satisfies CountertopSettings)
                }
                InputProps={{ inputProps: { max: 20, min: 5 } }}
                value={settings.countertop.width}
                variant="outlined"
                label="Width"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('countertop', {
                    ...settings.countertop,
                    height: Number(e.target.value),
                  } satisfies CountertopSettings)
                }
                InputProps={{ inputProps: { max: 20, min: 5 } }}
                value={settings.countertop.height}
                variant="outlined"
                label="Height"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <TextField
              onChange={(e) =>
                handleUpdate('countertop', {
                  ...settings.countertop,
                  depth: Number(e.target.value),
                } satisfies CountertopSettings)
              }
              InputProps={{ inputProps: { step: 0.1, max: 0.5, min: 0.1 } }}
              value={settings.countertop.depth}
              variant="outlined"
              label="Depth"
              type="number"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('countertop', {
                    ...settings.countertop,
                    textureRepeatX: Number(e.target.value),
                  } satisfies CountertopSettings)
                }
                InputProps={{ inputProps: { max: 5, min: 1 } }}
                value={settings.countertop.textureRepeatX}
                variant="outlined"
                label="Repeat X"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('countertop', {
                    ...settings.countertop,
                    textureRepeatY: Number(e.target.value),
                  } satisfies CountertopSettings)
                }
                InputProps={{ inputProps: { max: 5, min: 1 } }}
                value={settings.countertop.textureRepeatY}
                variant="outlined"
                label="Repeat Y"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <MuiColorInput
                onChange={(color: MuiColorInputValue) =>
                  handleUpdate('countertop', {
                    ...settings.countertop,
                    color,
                  } satisfies CountertopSettings)
                }
                value={settings.countertop.color}
                label="Color"
                format="hex"
                size="small"
              />
            </Grid>
            <Grid xs={6} item>
              <Button
                sx={{
                  height: '100%',
                }}
                variant="contained"
                component="label"
                size="small"
                fullWidth
              >
                Upload Texture
                <input
                  onChange={(e) => {
                    encodeImageFileAsURL(e, handleCountertopTextureUpload)
                  }}
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>

          <Grid xs={12} item>
            <Typography component="h2" variant="h4">
              Table Legs
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <FormControl fullWidth>
              <InputLabel id="LegsStyleSelect" size="small">
                Style
              </InputLabel>
              <Select
                onChange={(e) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    style: e.target.value,
                  } satisfies TablelegsSettings)
                }
                value={settings.tablelegs.style}
                labelId="LegsStyleSelect"
                id="LegsStyleSelect"
                label="Style"
                size="small"
              >
                <MenuItem value={'rounded'}>Rounded</MenuItem>
                <MenuItem value={'square'}>Square</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    size: Number(e.target.value),
                  } satisfies TablelegsSettings)
                }
                InputProps={{ inputProps: { step: 0.1, max: 0.5, min: 0.1 } }}
                value={settings.tablelegs.size}
                variant="outlined"
                type="number"
                label="Size"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    height: Number(e.target.value),
                  } satisfies TablelegsSettings)
                }
                InputProps={{ inputProps: { step: 1, max: 10, min: 1 } }}
                value={settings.tablelegs.height}
                variant="outlined"
                label="Height"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    textureRepeatX: Number(e.target.value),
                  } satisfies TablelegsSettings)
                }
                InputProps={{ inputProps: { step: 1, max: 5, min: 1 } }}
                value={settings.tablelegs.textureRepeatX}
                variant="outlined"
                label="Repeat X"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                onChange={(e) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    textureRepeatY: Number(e.target.value),
                  } satisfies TablelegsSettings)
                }
                InputProps={{ inputProps: { step: 1, max: 5, min: 1 } }}
                value={settings.tablelegs.textureRepeatY}
                variant="outlined"
                label="Repeat Y"
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={6} item>
              <MuiColorInput
                onChange={(color: MuiColorInputValue) =>
                  handleUpdate('tablelegs', {
                    ...settings.tablelegs,
                    color,
                  } satisfies TablelegsSettings)
                }
                value={settings.tablelegs.color}
                label="Color"
                format="hex"
                size="small"
              />
            </Grid>
            <Grid xs={6} item>
              <Button
                sx={{
                  height: '100%',
                }}
                variant="contained"
                component="label"
                size="small"
                fullWidth
              >
                Upload Texture
                <input
                  onChange={(e) => {
                    encodeImageFileAsURL(e, handleLegsTextureUpload)
                  }}
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: 'whitesmoke',
          height: '8rem',
          p: 2,
        }}
        alignItems="center"
        display="flex"
      >
        <Grid spacing={2} container>
          <Grid xs={12} item>
            <Button variant="outlined" component="label" size="small" fullWidth>
              Upload Custom Configuration
              <input onChange={handleConfigUpload} type="file" hidden />
            </Button>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          <Grid spacing={2} container xs={12} item>
            <Grid xs={4} item>
              <Button
                onClick={handleScreenshot}
                variant="outlined"
                component="label"
                size="small"
                fullWidth
              >
                Screenshot
              </Button>
            </Grid>
            <Grid xs={4} item>
              <Button
                onClick={handleReset}
                variant="outlined"
                component="label"
                size="small"
                fullWidth
              >
                New Table
              </Button>
            </Grid>
            <Grid xs={4} item>
              <Button
                onClick={handleConfigDownload}
                variant="contained"
                component="label"
                color="success"
                size="small"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
export default SettingsOverlay
