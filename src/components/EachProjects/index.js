import './index.css'

const EachProjects = props => {
  const {eachObjectList} = props
  const {name, imageUrl} = eachObjectList
  return (
    <li className="container-lists">
      <img src={imageUrl} alt={name} className="lists-image" />
      <p className="name">{name}</p>
    </li>
  )
}

export default EachProjects
