export const InformationContact = ({ title, items }) => {
  if (!items) return null
  return (
    <div className="flex flex-col gap-14 text-14 leading-[150%] tracking-[0.01em] md:text-15">
      <h2 className="sr-only">Email</h2>
      <ul className="flex flex-col items-center">
        {items?.map((item) => (
          <li key={item._key}>
            <a
              href={item.url}
              className="underline decoration-[0.5px] underline-offset-4"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
