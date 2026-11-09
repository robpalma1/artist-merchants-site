import { useEffect, useState } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'

import { AnimatePresence, motion } from 'framer-motion'
import { easeInOutQuart } from 'lib/animation'
import { PortableText } from '@portabletext/react'
import { InfoHeader } from 'components/Header/InfoHeader'
import { InformationContact } from 'components/Information/InformationContact'
import { ArchiveForm } from 'components/Archive/ArchiveForm'

export const HomeMenu = ({ description, contact, information }) => {
  const { menuOpen, setMenuActiveItem, menuActiveItem } = useSiteStore()

  const handleItemClick = (item: string) => {
    setMenuActiveItem(item)
  }

  useEffect(() => {
    if (!menuOpen) {
      setMenuActiveItem(null)
    }
  }, [menuOpen])

  return (
    <>
      <AnimatePresence mode="wait">
        {menuOpen ? (
          <motion.nav
            className="z-100 fixed inset-0 flex h-full w-full transform-gpu flex-col items-center justify-center gap-24 p-32 font-sans md:gap-28 text-12 leading-[120%] will-change-transform md:text-14"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: menuActiveItem === null ? 1 : 0,
              scale: menuActiveItem === null ? 1 : 0.975,
            }}
            transition={{ duration: 0.65, ease: easeInOutQuart, delay: 0 }}
          >
            <MenuButton onClick={() => handleItemClick('information')}>
              Information
            </MenuButton>
            <MenuButton onClick={() => handleItemClick('archive')}>
              Archive
            </MenuButton>
            <MenuButton onClick={() => handleItemClick('contact')}>
              Contact
            </MenuButton>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {menuActiveItem === 'information' ? (
          <MenuItemOverlay onClose={() => setMenuActiveItem(null)}>
            <div className="flex w-full flex-col gap-14 md:max-w-[400px]">
              <PortableText
                value={description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-left font-sans text-14 leading-[150%] tracking-[0.01em] last-of-type:pb-0 md:text-15">
                        {children}
                      </p>
                    ),
                  },
                  marks: {
                    superscript: ({ children }) => (
                      <sup className="relative -top-8 text-8">{children}</sup>
                    ),
                  },
                }}
              />
            </div>
          </MenuItemOverlay>
        ) : null}
        {menuActiveItem === 'contact' ? (
          <MenuItemOverlay onClose={() => setMenuActiveItem(null)}>
            <InformationContact title={contact?.title} items={contact?.items} />
          </MenuItemOverlay>
        ) : null}
        {menuActiveItem === 'archive' ? (
          <MenuItemOverlay onClose={() => setMenuActiveItem(null)}>
            <div className="flex w-full min-w-[320px] flex-col gap-14">
              <h2 className="pb-6 text-caption uppercase">Archive</h2>
              <ArchiveForm />
            </div>
          </MenuItemOverlay>
        ) : null}
      </AnimatePresence>
    </>
  )
}

const MenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <motion.button
      className="ease text-13 uppercase tracking-[0.08em] md:text-14 transition-colors duration-300 will-change-auto hover:border-[#888888] active:border-[#888888]"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -8, opacity: 0 }}
      transition={{ duration: 0.65, ease: easeInOutQuart, delay: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

const MenuItemOverlay = ({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) => {
  return (
    <motion.div
      className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-40px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 p-24 px-20 py-32 text-white md:w-fit"
      initial={{
        scale: 0.975,
        y: '-50%',
        x: '-50%',
        opacity: 0,
        filter: 'blur(6px)',
      }}
      animate={{
        scale: 1,
        y: '-50%',
        x: '-50%',
        opacity: 1,
        filter: 'blur(0px)',
      }}
      exit={{
        scale: 0.975,
        y: '-50%',
        x: '-50%',
        opacity: 0,
        filter: 'blur(6px)',
      }}
      transition={{ duration: 0.65, ease: easeInOutQuart, delay: 0 }}
    >
      {children}
    </motion.div>
  )
}
