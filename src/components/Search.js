import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modla";
import './Search.css'

const Search = () => {
    const [inputTerm, setInputTearm] = useState("")
    const [searchTearm, setSearchTearm] = useState("Plane")
    const [results, setResults] = useState([]);
    const [modal, setModal] = useState(false)
    const [srcPath, setSrcPath] = useState("")

    const Search = async (search) => {
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${search} &per_page=24&format=json&nojsoncallback=1`
        const {data: {photos: {photo}}} = await axios.get(url);
        return photo
    }
    useEffect(() => {
            Search(searchTearm)
                .then(r=>setResults(r))
                .catch(e=>console.log(e.message))
    }, [searchTearm])

    const getPhoto = ( srcP) => {
        setModal(true);
        setSrcPath(srcP);
    }

    const handleKeyPress = e => {
        if (e.key === "Enter")
            setSearchTearm(inputTerm)
    }
    const handleButton = (buttonText) => {
        setSearchTearm(buttonText);
        setInputTearm(buttonText);
    }
    const renderedResults = results?.map((result) => {
        const { server, id, secret} = result;

        const srcPath = 'https://live.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
        return (
            <div key={id}>
                <img src={srcPath} alt="" onClick={() => {
                    getPhoto(srcPath)
                    window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        }
                    );
                }}/>
            </div>
        )
    })
    return (
        <>
            <div className="ui large icon input">
                <input
                    placeholder={"Search..."}
                    value={inputTerm}
                    onChange={e => setInputTearm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className="mContainer">
                <div className="buttons">
                    <button className="ui secondary button" onClick={() => handleButton("Earth")}>Earth</button>
                    <button className="ui secondary button" onClick={() => handleButton("Mobile")}>Mobile</button>
                    <button className="ui secondary button" onClick={() => handleButton("Moon")}>Moon</button>
                    <button className="ui secondary button" onClick={() => handleButton("Music")}>Music</button>
                </div>
                <h3>{searchTearm} Images</h3>
                {modal && <Modal modalVisible={setModal} srcPath={srcPath}></Modal>}
            </div>
            <div className="cards">
                {renderedResults}
            </div>

        </>
    )
}
export default Search;