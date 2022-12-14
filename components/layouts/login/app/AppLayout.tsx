import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { MdChevronRight } from 'react-icons/md'

import { AppHeaderButton } from './AppHeaderButton'
import { AppSidebar } from './AppSidebar'
import { AuthMenu } from './AuthMenu'

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [sidebarReady, setSidebarReady] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.openSidebar) setSidebarOpen(true)
    else setSidebarOpen(false)
    setSidebarReady(true)
  }, [])

  React.useEffect(() => {
    if (!sidebarReady) return
    if (sidebarOpen) localStorage.openSidebar = 1
    else delete localStorage.openSidebar
  }, [sidebarOpen, sidebarReady])

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          background: #fff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          padding: 8px;
          display: flex;
          gap: 8px;
          align-items: center;
        `}
      >
        <AppHeaderButton
          css={css`
            padding: 0;
            height: 24px;
            width: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <motion.div
            css={css`
              width: 100%;
              height: 100%;

              display: flex;
              justify-content: center;
              align-items: center;
            `}
            animate={{
              rotate: sidebarOpen ? 180 : 0,
            }}
          >
            <MdChevronRight size={20} />
          </motion.div>
        </AppHeaderButton>
        <Link href="/" passHref>
          <a
            css={css`
              font-family: 'Inter', sans-serif;
              font-weight: 300;
              font-size: 18px;
              color: #000;
              &:hover {
                color: #000;
              }
            `}
          >
            KyungheeWiki
          </a>
        </Link>
        <div
          css={css`
            flex-grow: 1;
          `}
        />
        <AuthMenu />
      </div>

      <div
        css={css`
          display: flex;
          flex-grow: 1;
          height: 0;
          position: relative;
        `}
      >
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              css={css`
                background: rgba(0, 0, 0, 0.6);
                position: absolute;
                width: 100%;
                height: 100%;
                display: none;

                @media (max-width: 768px) {
                  display: block;
                }
              `}
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={{
            width: sidebarOpen ? 'auto' : 0,
          }}
          css={css`
            overflow: hidden;

            @media (max-width: 768px) {
              position: absolute;
              height: 100%;
            }
          `}
          transition={{
            bounce: 0,
          }}
        >
          <div
            css={css`
              border-right: 1px solid rgba(0, 0, 0, 0.2);
              background: #fff;
              height: 100%;
              width: 240px;
              overflow-y: auto;
            `}
          >
            <AppSidebar />
          </div>
        </motion.div>
        <div
          css={css`
            flex-grow: 1;
            height: 100%;
            width: 0;
            overflow-y: hidden;
            min-height: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              padding: 0 24px;
              min-height: 100%;

              @media (max-width: 768px) {
                padding: 0;
                display: flex;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                margin-top: 24px;

                width: 100%;
                max-width: 960px;
                margin-left: auto;
                margin-right: auto;
                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 24px;
                border-radius: 12px;

                @media (max-width: 768px) {
                  min-height: 100%;
                  border-radius: 0;
                  border: none;

                  margin-top: 0;

                  flex-grow: 1;
                }
              `}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
