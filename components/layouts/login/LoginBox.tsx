import { css } from '@emotion/react'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

export const LoginBox: React.FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div
      css={css`
        background: #fff;
        border-radius: 24px;
        box-shadow: 3px 3px 40px rgba(0, 0, 0, 0.1);
        max-width: 440px;
        width: 100vw;

        @media screen and (max-width: 512px) {
          height: 100vh;
          border-radius: 0;
          position: fixed;
          overflow-x: hidden;
          overflow-y: auto;
          max-width: unset;
        }
      `}
    >
      <div
        css={css`
          padding: 48px;
          width: 100%;
          display: flex;
          flex-direction: column;

          @media screen and (max-width: 512px) {
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 0;
            padding-bottom: 0;
            min-height: 100vh;
          }
        `}
      >
        <div
          css={css`
            font-size: 32px;
            font-weight: 300;
            text-align: center;

            @media screen and (max-width: 512px) {
              margin-top: 64px;
            }
          `}
        >
          {title}
        </div>
        <div
          css={css`
            margin-top: 32px;

            @media screen and (max-width: 512px) {
              flex-grow: 1;
            }
          `}
        >
          {children}
        </div>
        <div
          css={css`
            position: fixed;
            left: 48px;
            bottom: 48px;
            display: flex;
            gap: 40px;
            font-size: 18px;
            font-weight: 300;

            @media screen and (max-width: 512px) {
              font-size: 16px;
              position: static;
              gap: 22px;
              margin-bottom: 24px;
            }

            a {
              color: rgba(0, 0, 0, 0.6);
              &:hover {
                color: #000;
              }
            }
          `}
        >
          <Link href="/terms">
            <a>Terms</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
          <Link href="/legal">
            <a>Legal Notice</a>
          </Link>
        </div>
      </div>
    </div>
  )
}