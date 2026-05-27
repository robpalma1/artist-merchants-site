import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'
import { mixpanel } from 'lib/mixpanel'

export const ArchiveForm = () => {
  const [error, setError] = useState<string | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const password = passwordRef.current?.value

    if (!password) {
      setError('Incorrect password')
      return
    }

    try {
      const res = await fetch(`/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        throw new Error('Incorrect password')
      }

      const data = await res.json()

      // Track the unlock event with client identifier
      mixpanel.track('Archive Unlocked', {
        client: data.clientName ?? 'unknown',
      })
      mixpanel.identify(data.clientName ?? 'unknown')
      mixpanel.people.increment('Archive Unlocks')

      router.push('/archive')
    } catch (error) {
      setError('Incorrect password')
    }
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-8 text-body-lg md:col-span-2"
      key="archive-locked"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.39, ease: 'easeInOut' }}
    >
      <form
        className={`flex w-full flex-col gap-6 ${error ? 'animate-shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="relative flex w-full items-start gap-6">
          <label className="sr-only" htmlFor="password">
            Password :{' '}
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            className="w-full flex-1 appearance-none rounded-[0px] border-b-1 border-solid border-white bg-transparent py-4 text-body-lg focus:outline-none"
            ref={passwordRef}
          />
          <button
            className="ease absolute -bottom-6 right-0 translate-x-8 p-12 text-left text-18 transition-transform duration-300 hover:translate-x-12"
            type="submit"
          >
            <span className="sr-only">Submit</span>
            &rarr;
          </button>
        </div>
        {error ? (
          <p className="text-caption uppercase" aria-live="polite">
            {error}
          </p>
        ) : null}
      </form>
    </motion.div>
  )
}
