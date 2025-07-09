
const Footer = () => {
  return (
    <footer style={{textAlign: 'center',padding:'14px', marginTop:'8px', background:'#104d72d6',fontWeight:"600",color:'white'}}>
      © {new Date().getFullYear()} FocusTube - learn with focus <span style={{ fontStyle: 'italic' }}>(Beta version)</span>
      <br />
      <span>Developed by <strong>Kamrul Hasan</strong></span>
    </footer>
  )
}

export default Footer;