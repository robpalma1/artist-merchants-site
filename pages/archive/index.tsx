import { useEffect } from 'react'
import { getCategoryAllPage, getSettings } from 'lib/sanity.client'
import { ArchiveListPage } from 'components/Archive/ArchiveListPage'
import { mixpanel } from 'lib/mixpanel'

export default function Archive({ page, settings }) {
  useEffect(() => {
    try {
      const clientName = document.cookie.match(/(?:^|;\s*)client_name=([^;]*)/)?.[1]
      const name = clientName ? decodeURIComponent(clientName) : 'unknown'
      mixpanel.track('Archive Viewed', {
        url: window.location.href,
        client: name,
      })
      if (mixpanel.people) {
        mixpanel.people.increment('Archive Views')
      }
    } catch (_) {}
  }, [])

  return <ArchiveListPage {...page} settings={settings} />
}

export async function getStaticProps(context) {
  const preview = context.draftMode
  const pageQuery = getCategoryAllPage
  const [settings, page] = await Promise.all([getSettings(), pageQuery()])

  return {
    props: {
      settings,
      page,
      preview: preview ?? false,
    },
    revalidate: 3600,
  }
}
