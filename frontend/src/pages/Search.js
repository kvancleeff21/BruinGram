import React,{useState, useEffect} from "react";
import { useNavigate  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Search(){
    const navigate = useNavigate();
    const [data,setData] = useState([])
    
     
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'
        fetch('http://localhost:8000/search/?'+ new URLSearchParams({
             q: ''
         })
        ,{
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        })
        .catch(err=>{
            alert(err);
            console.log(err)
          })
    },[])

    const search = (input)=>{
        console.log("Searching" + input)
        fetch('http://localhost:8000/search/?'+ new URLSearchParams({
             q: input
         })
        ,{
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        })
        .catch(err=>{
            alert(err);
            console.log(err)
          })
    }
    // search 
    // fetch('http://localhost:8000/?'+ new URLSearchParams({
    //      type: 'forYou'
    //  })
    // ,{
    //     headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":"Bearer "+localStorage.getItem("jwt")
    //     }
    // }).then(res=>res.json())
    // .then(result=>{
    //     console.log(result)
    //     setforYouData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
    // })
    
    return (
    <div>
        <h1>Search Users</h1>
        <div class="">
          <form class="form-inline my-2 my-lg-0" onSubmit={(e)=>{
                e.preventDefault()
                search(e.target[0].value)
                }}>
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        {data.map(item=>{
                    return(
                        <div style={{padding:'10px'}}>
                            {item.avatar?
                            <img src={item.avatar} alt="Avatar" style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"100px"}}/>
                            :<img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                            alt="Avatar" style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"100px"}}/>
                            }
                            <h5 onClick={()=>{navigate(`/user/${item.username}`, { replace: true })}}>{item.username}: Posts - {item.postCount}</h5>
                            <div className='timestamp'>Followers - {item.followersCount} Following - {item.followingsCount}</div>
                        </div>
                    )
                })}
    </div>
    )
}