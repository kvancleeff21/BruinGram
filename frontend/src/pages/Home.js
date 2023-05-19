import React from 'react'
import axios from 'axios'
import {CloudinaryContext, Transformation, Image} from 'cloudinary-react'
import {render} from 'react-dom'

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            gallery: []
        }
    }
    componentDidMount(){
        // Request images with specific tag (in this case "photo")
        axios.get('https://res.cloudinary.com/nameOfCloud?/image/list/photo.json')
         .then(res => {
            console.log(res.data.resources);
            this.setState({gallery: res.data.resources});
         });
    }
    // Could add code here for upload using:
    // uploadWidget() { . . .

    render(){
        return(
            <div className="main">
                <h1>Gallery</h1>
                <div className="gallery">
                    <CloudinaryContext cloudName="cloud_name">
                        {
                            this.state.gallery.map(data =>{
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target = "_blank"
                                            href={'https://res.cloudinary.com/cloudName/image/upload/${data.public_id}.jpg'}>
                                                <Image publicId={data.public_id}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="300"
                                                        height="200"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                                            </a>
                                            <div className="desc">
                                                Created at {data.created_at}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    <div className="clearfix"></div>
                </div>
            </div>
        )

    }
}

const Home = ()=>{
    return (
    <div>
        <h1>Home/Profile Page</h1>
        <Main />
    </div>
    )
}

export default Home