import React, { Component } from "react";
import { Link } from "react-router-dom";

const cardEqualHeight = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const cardFooter = {
  marginTop: "auto",
};

// function Home() {

//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }
//   return (
//     <>
//       <section className="hero is-dark mb-4">
//         <div className="hero-body">
//           <div className="container">
//             <h1 className="title">Make Insurance Fair and Accessible</h1>
//             <p>
//               Decentralized insurance protocol to collectively build insurance
//               products.
//             </p>
//           </div>
//         </div>
//       </section>
//       <div className="container is-fluid">
//         <div className="columns">
//           <div className="column">
//             <div className="card" style={cardEqualHeight}>
//               <div className="card-content">
//                 <div className="content">
//                   <h2>
//                     <span role="img" aria-label="airplane">
//                       🛫
//                     </span>{" "}
//                     Insurance Created
//                   </h2>
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th><abbr title="Block Address">Address</abbr></th>
//                         <th><abbr title="Name">Name</abbr></th>
//                         <th><abbr title="Played">Type</abbr></th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <th>1</th>
//                         <td>
//                           <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a>
//                           <strong>(C)</strong>
//                         </td>
//                         <td><span class="tag is-link is-light">Flight</span></td>
//                         <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>

//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="column">
//             <div className="card" style={cardEqualHeight}>
//               <div className="card-content">
//                 <div className="content">
//                   <h2>
//                     <span role="img" aria-label="rain">
//                       🌧️
//                     </span>{" "}
//                     Investments
//                   </h2>
//                   <table class="table">
//                     <thead>
//                       <tr>
//                         <th><abbr title="Block Address">Address</abbr></th>
//                         <th><abbr title="Name">Name</abbr></th>
//                         <th><abbr title="Played">Type</abbr></th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <th>1</th>
//                         <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
//                         </td>
//                         <td><span class="tag is-link is-light">Medical</span></td>
//                         <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
//                       </tr>
//                     </tbody>
//                   </table>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="tabs">
//         <ul>
//           <li class="is-active" onClick={handleClick} ><a>Pictures</a></li>
//           <li><a>Music</a></li>
//           <li><a>Videos</a></li>
//           <li><a>Documents</a></li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Home;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      // t: 'Pictures'
    };
    // this.handleClickActiveTab = this.handleClickActiveTab.bind(this);
  }
  selected_tab ='Pictures'
  handleClick = (id) => {
    document.getElementById(this.selected_tab).className = ''
    var content = this.selected_tab +"Tab"
    document.getElementById(content).className = 'is-hidden'
    document.getElementById(id).className = 'is-active'
    var newcontent = id + "Tab"
    document.getElementById(newcontent).className = "table"
    this.selected_tab = id
  }

  render() {
    // return (
    //   <button onClick={this.handleClick.bind(this, 't')}>
    //     Click me
    //   </button>
    // );
    return (
      <>
        <section className="hero is-dark mb-4">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Make Insurance Fair and Accessible</h1>
              <p>
                Decentralized insurance protocol to collectively build insurance
                products.
                  </p>
            </div>
          </div>
        </section>
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">
              <div className="card" style={cardEqualHeight}>
                <div className="card-content">
                  <div className="content">
                    <h2>
                      <span role="img" aria-label="airplane">
                        🛫
                          </span>{" "}
                          Insurance Created
                        </h2>
                    <table class="table">
                      <thead>
                        <tr>
                          <th><abbr title="Block Address">Address</abbr></th>
                          <th><abbr title="Name">Name</abbr></th>
                          <th><abbr title="Played">Type</abbr></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>
                            <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a>
                            <strong>(C)</strong>
                          </td>
                          <td><span class="tag is-link is-light">Flight</span></td>
                          <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="card" style={cardEqualHeight}>
                <div className="card-content">
                  <div className="content">
                    <h2>
                      <span role="img" aria-label="rain">
                        🌧️
                          </span>{" "}
                          Investments
                        </h2>
                    <table class="table">
                      <thead>
                        <tr>
                          <th><abbr title="Block Address">Address</abbr></th>
                          <th><abbr title="Name">Name</abbr></th>
                          <th><abbr title="Played">Type</abbr></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
                          </td>
                          <td><span class="tag is-link is-light">Medical</span></td>
                          <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs" >
          <ul>
            <li class="on-active" onClick={this.handleClick.bind(this, 'Pictures')} id='Pictures'><a>Pictures</a></li>
            <li onClick={this.handleClick.bind(this, 'Music')} id='Music'><a>Music</a></li>
            <li onClick={this.handleClick.bind(this,'Videos')} id='Videos'><a>Videos</a></li>
          </ul>
        </div>
        <div class="tabs-contents">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">
              <div className="card" style={cardEqualHeight}>
                <div className="card-content">
                  <div className="content" >
                    <h2>
                      <span role="img" aria-label="airplane" >
                        🛫
                          </span>{" "}
                          {this.selected_tab}
                        </h2>
                    <table class="table" id="PicturesTab">
                      <thead>
                        <tr>
                          <th><abbr title="Block Address">Address</abbr></th>
                          <th><abbr title="Name">Name</abbr></th>
                          <th><abbr title="Played">Type</abbr></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>
                            <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a>
                            <strong>(C)</strong>
                          </td>
                          <td><span class="tag is-link is-light">Flight</span></td>
                          <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>

                        </tr>
                      </tbody>
                    </table>
                    <table class="is-hidden" id="MusicTab">
                      <thead>
                        <tr>
                          <th><abbr title="Block Address">Address</abbr></th>
                          <th><abbr title="Name">Name</abbr></th>
                          <th><abbr title="Played">Type</abbr></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>
                            <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a>
                            <strong>(C)</strong>
                          </td>
                          <td><span class="tag is-link is-light">Flight</span></td>
                          <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>

                        </tr>
                      </tbody>
                    </table>
                    <table class="is-hidden" id="VideosTab">
                      <thead>
                        <tr>
                          <th><abbr title="Block Address">Address</abbr></th>
                          <th><abbr title="Name">Name</abbr></th>
                          <th><abbr title="Played">Type</abbr></th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>
                            <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a>
                            <strong>(C)</strong>
                          </td>
                          <td><span class="tag is-link is-light">Flight</span></td>
                          <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}
export default Home;
// import React, { Component } from "react";


// class Home extends React.Component {
// constructor(props) {
// super(props);
// this.state = {
//   activeTab: 0,
// };
// this.handleClickActiveTab = this.handleClickActiveTab.bind(this);
// }

// handleClickActiveTab(e) {
//   const newActiveTab = e.target.tab;
//  this.setState({
//   activeTab : newActiveTab,
// })
// }

// render() {
//   const activeClass ='is-active';
// return (
//   <div styleName="page" className="container">
//     <nav className="full-width-with-padding" styleName="nav-tabs-wrap">
//       <ul styleName="nav-tabs">
//         <li styleName={`nav-tabs__item ${this.state.activeTab == 0 ? activeClass : 
//           ''}`}>
//           <a styleName="nav-tabs__item-link" data-tab="0" onClick= 
//             {this.handleClickActiveTab}>
//             My BQ
//           </a>
//         </li>
//         <li styleName={`nav-tabs__item ${this.state.activeTab == 1 ? activeClass 
//               : ''}`}>
//           <a styleName="nav-tabs__item-link" data-tab="1" onClick= 
//            {this.handleClickActiveTab}>
//             Subscriptions
//           </a>
//         </li>
//         <li styleName={`nav-tabs__item ${this.state.activeTab == 2 ? activeClass 
//              : ''}`}>
//           <a styleName="nav-tabs__item-link" data-tab="2" onClick= 
//              {this.handleClickActiveTab}>
//             Promotions
//           </a>
//         </li>
//         <li styleName={`nav-tabs__item ${this.state.activeTab == 3 ? activeClass 
//                : '' }`}>
//           <a styleName="nav-tabs__item-link" data-tab="3" onClick= 
//              {this.handleClickActiveTab}>
//             Contact
//           </a>
//         </li>
//         <li styleName={`nav-tabs__item ${this.state.activeTab == 4 ? activeClass 
//         : '' }`}>
//           <a styleName="nav-tabs__item-link" data-tab="4" onClick= 
//              {this.handleClickActiveTab}>
//             Bookmark
//           </a>
//         </li>
//       </ul>
//     </nav>
//     <div />
//   </div>
//   );
// }
// }

//  export default Home;