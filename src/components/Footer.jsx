
const Footer = () => {
  return (
    <footer className="text-center p-4 mt-8 bg-gray-100 text-gray-600">
      © {new Date().getFullYear()} FocusTube - learn with focus <span style={{ fontStyle: 'italic' }}>(Beta version)</span>
      <br />
      <span>Developed by <strong>Kamrul Hasan</strong></span>
    </footer>
  )
}

export default Footer;