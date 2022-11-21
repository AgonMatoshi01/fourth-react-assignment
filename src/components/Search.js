import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./Modla";
import './Search.css'

const Search = () => {
    const [inputTerm, setInputTearm] = useState("")
    const [search, setSearch] = useState("Plane")
    const [results, setResults] = useState([]);
    const [modal, setModal] = useState(false)
    const [toBeDesplayd, setToBeDesplayd] = useState(null)

    const inputSearch = async (search) => {
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${search} &per_page=24&format=json&nojsoncallback=1`
        const {data} = await axios.get(url);
        // setResults(data.photos.photo);
        return data.photos.photo;
    }

    useEffect(() => {
        inputSearch(search).then(r => {
            setResults(r);
        })
    }, [search])

    const handleEsc = (e) => {
        if (e.keyCode === 27) {
            setModal(false)
        }
    };
    window.addEventListener('keydown', handleEsc);

    const getPhoto = (user) => {
        setToBeDesplayd(user)
        setModal(true);

    }
    const handleKeyPress = e => {
        console.log(e)
        if (e.key === "Enter")
            setSearch(inputTerm)
    }
    const handleButton = (buttonText) => {
        setSearch(buttonText);
    }
    const renderedResults = results.map((result) => {
        const {farm, server, id, secret} = result;

        const srcPath = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
        return (
            <div key={id}>
                <img src={srcPath} alt="" onClick={() => {
                    getPhoto(result)
                    window.removeEventListener('keydown', handleEsc);
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

        <div>
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
                    <button className="ui secondary button" onClick={() => handleButton("Naruto")}>Naruto</button>
                    <button className="ui secondary button" onClick={() => handleButton("Music")}>Music</button>
                </div>
                <h3>{search} Images</h3>
                {modal && <Modal photo={toBeDesplayd} modalVisible={setModal}></Modal>}
            </div>
            <div className="cards">
                {renderedResults}
            </div>

        </div>
    )
}
export default Search;