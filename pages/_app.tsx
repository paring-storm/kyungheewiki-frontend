import { css } from '@emotion/react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'

import { userAtom } from '../atoms'
import { AppLayout } from '../components/layouts/login/app/AppLayout'
import '../styles/globals.scss'
import { fetchCurrentUser } from '../utils/auth'

function MyAppWrapper(props: AppProps) {
  return (
    <RecoilRoot>
      <MyApp {...props} />
    </RecoilRoot>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = useRecoilState(userAtom)

  const inApp = router.pathname.startsWith('/app')

  React.useMemo(async () => {
    if (typeof window === 'undefined') return

    if (!loading) return

    try {
      const user = await fetchCurrentUser()

      setUser(user)
    } finally {
      setLoading(false)
    }
  }, [loading, setUser])

  React.useEffect(() => {
    if (inApp && !user && !loading) {
      router.push('/')
    }
  }, [inApp, router, user, loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            css={css`
              display: flex;
              width: 100vw;
              height: 100vh;
              justify-content: center;
              align-items: center;
              position: fixed;
              left: 0;
              top: 0;
              z-index: 99999;
            `}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                type: 'tween',
              }}
              css={css`
                width: 64px;
                height: 64px;
                border-radius: 50%;

                border: 6px solid #d6d6d6;
                border-top: 6px solid #000;
              `}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            css={css`
              background: linear-gradient(270deg, #fae8ff 0%, #e2e8f0 49.85%, #ffffff 100%);
              width: 100vw;
              height: 100vh;
              overflow-y: auto;
            `}
          >
            <LayoutGroup>
              <AnimatePresence mode="wait">
                {inApp ? (
                  user ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      css={css`
                        height: 100%;
                        width: 100%;
                      `}
                    >
                      <AppLayout>
                        <Component {...pageProps} key={router.route} />
                      </AppLayout>
                    </motion.div>
                  ) : (
                    <></>
                  )
                ) : (
                  <Component {...pageProps} key={router.route} />
                )}
              </AnimatePresence>
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>
      <NextNProgress color="#2e43ff" />
    </>
  )
}

export default MyAppWrapper
