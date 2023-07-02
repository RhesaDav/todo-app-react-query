export default function ListLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <div>To Do</div>
        <nav></nav>
   
        {children}
      </section>
    )
  }