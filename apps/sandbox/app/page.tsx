import {
  Box,
  Container,
  Grid,
  GridItem,
  Stack,
  Surface,
} from '@cre/cre-web-ui'

export default function Home() {
  return (
    <main className="min-h-screen py-12 bg-gray-100">

      {/* ── Container ─────────────────────────────────────── */}
      <Container variant="fluid">
        <Stack gap={12}>

          <section>
            <h1 className="font-heading text-3xl font-bold mb-2 text-neutral-900">
              CRE Sandbox
            </h1>
            <p className="font-body text-base text-neutral-600">
              Ambiente de teste para os primitivos do <code>@cre/ui-kit</code>.
            </p>
          </section>

          {/* ── Surface variants ──────────────────────────── */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-6">Surface</h2>
            <Grid cols={1} colsSm={2} colsMd={3}>
              <GridItem>
                <Surface variant="default">
                  <p className="font-body text-sm font-semibold mb-1">default</p>
                  <p className="font-body text-sm text-neutral-600">Área base sem elevação.</p>
                </Surface>
              </GridItem>

              <GridItem>
                <Surface variant="raised">
                  <p className="font-body text-sm font-semibold mb-1">raised</p>
                  <p className="font-body text-sm text-neutral-600">Card com sombra leve.</p>
                </Surface>
              </GridItem>

              <GridItem>
                <Surface variant="overlay">
                  <p className="font-body text-sm font-semibold mb-1">overlay</p>
                  <p className="font-body text-sm text-neutral-600">Camada flutuante.</p>
                </Surface>
              </GridItem>

              <GridItem>
                <Surface variant="sunken">
                  <p className="font-body text-sm font-semibold mb-1">sunken</p>
                  <p className="font-body text-sm text-neutral-600">Área rebaixada para inputs.</p>
                </Surface>
              </GridItem>

              <GridItem>
                <Surface variant="interactive" tabIndex={0}>
                  <p className="font-body text-sm font-semibold mb-1">interactive</p>
                  <p className="font-body text-sm text-neutral-600">
                    Hover e focus visíveis. Tente clicar.
                  </p>
                </Surface>
              </GridItem>
            </Grid>
          </section>

          {/* ── Grid system ───────────────────────────────── */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-6">Grid</h2>
            <Surface variant="default" padded={false} className="p-4">
              <p className="font-body text-xs text-neutral-500 mb-3">
                4 cols (xs) → 8 cols (sm) → 12 cols (md)
              </p>
              <Grid cols={4} colsSm={8} colsMd={12}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <GridItem key={i}>
                    <Box className="bg-[#7B1234]/10 border border-[#7B1234]/20 rounded p-2 text-center">
                      <span className="font-body text-xs text-[#7B1234]">{i + 1}</span>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Surface>
          </section>

          {/* ── Stack ─────────────────────────────────────── */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-6">Stack</h2>
            <Grid cols={1} colsSm={2}>
              <GridItem>
                <Surface variant="raised">
                  <p className="font-body text-sm font-semibold mb-3">Stack vertical (gap 4)</p>
                  <Stack gap={4}>
                    {['Item A', 'Item B', 'Item C'].map((label) => (
                      <Box key={label} className="bg-gray-100 rounded p-3 font-body text-sm">
                        {label}
                      </Box>
                    ))}
                  </Stack>
                </Surface>
              </GridItem>

              <GridItem>
                <Surface variant="raised">
                  <p className="font-body text-sm font-semibold mb-3">Stack horizontal (gap 4)</p>
                  <Stack direction="horizontal" gap={4}>
                    {['X', 'Y', 'Z'].map((label) => (
                      <Box key={label} className="bg-gray-100 rounded p-3 font-body text-sm flex-1 text-center">
                        {label}
                      </Box>
                    ))}
                  </Stack>
                </Surface>
              </GridItem>
            </Grid>
          </section>

          {/* ── Container variants ────────────────────────── */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-6">Container</h2>
            <Stack gap={4}>
              <Surface variant="sunken" padded={false}>
                <Container variant="fluid">
                  <Box className="bg-[#7B1234]/10 border border-dashed border-[#7B1234]/40 p-4 rounded font-body text-sm text-center text-[#7B1234]">
                    Container <strong>fluid</strong> — 100% com px responsivo
                  </Box>
                </Container>
              </Surface>

              <Surface variant="sunken" padded={false}>
                <Container variant="fixed">
                  <Box className="bg-blue-50 border border-dashed border-blue-400 p-4 rounded font-body text-sm text-center text-blue-700">
                    Container <strong>fixed</strong> — max-width 1440px (xl) / 1920px (wide)
                  </Box>
                </Container>
              </Surface>
            </Stack>
          </section>

        </Stack>
      </Container>
    </main>
  )
}
