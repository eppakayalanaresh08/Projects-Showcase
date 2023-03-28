import {Component} from 'react'

import Loader from 'react-loader-spinner'

import EachProjects from '../EachProjects'

import Header from '../Header'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiListSelect = {
  isInitial: 'INITIAL',
  isSuccess: 'SUCCESS',
  isLoading: 'LOADING',
  isFailure: 'FAILURE',
}

class ProjectShowCase extends Component {
  state = {
    optionsSelect: categoriesList[0].id,
    apiSelect: apiListSelect.isInitial,
    listsObjects: {},
  }

  componentDidMount() {
    this.getMountList()
  }

  renderProjects = dataObject => ({
    id: dataObject.id,
    name: dataObject.name,
    imageUrl: dataObject.image_url,
  })

  getMountList = async () => {
    this.setState({apiSelect: apiListSelect.isLoading})
    const {optionsSelect} = this.state
    const urlSelect = `https://apis.ccbp.in/ps/projects?category=${optionsSelect}`
    const option = {
      method: 'GET',
    }

    const fetchData = await fetch(urlSelect, option)
    if (fetchData.k === true) {
      const data = await fetchData.json()
      const updateDate = {
        projects: data.projects.map(eachObject =>
          this.renderProjects(eachObject),
        ),
        total: data.total,
      }

      this.setState({
        apiSelect: apiListSelect.isSuccess,
        listsObjects: updateDate,
      })
    } else {
      this.setState({apiSelect: apiListSelect.isFailure})
    }

    // this.setState({})
  }

  renderSelect = event => {
    this.setState({optionsSelect: event.target.value}, this.getMountList)
  }

  renderSuccess = () => {
    const {listsObjects} = this.state
    const {projects} = listsObjects
    return (
      <div className="container-Projects">
        <ul className="each-Projects">
          {projects.map(eachObject => (
            <EachProjects eachObjectList={eachObject} key={eachObject.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="container-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="heading-Wrong">Oops! Something Went Wrong</h1>
      <p className="description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getMountList}
        className="button-Element"
      >
        Retry
      </button>
    </div>
  )

  renderSwitchStatus = () => {
    const {apiSelect} = this.state
    switch (apiSelect) {
      case apiListSelect.isSuccess:
        return this.renderSuccess()
      case apiListSelect.isLoading:
        return this.renderLoading()
      case apiListSelect.isFailure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {optionsSelect} = this.state
    console.log(optionsSelect)
    return (
      <>
        <Header />
        <div>
          <select
            value={optionsSelect}
            onChange={this.renderSelect}
            className="select-showCase"
          >
            {categoriesList.map(eachObject => (
              <option key={eachObject.id} value={eachObject.id}>
                {eachObject.displayText}
              </option>
            ))}
          </select>

          {this.renderSwitchStatus()}
        </div>
      </>
    )
  }
}

export default ProjectShowCase
