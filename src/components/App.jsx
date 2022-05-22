import '../App.css';
import {useState} from "react";
import ImageEdit from "./ImageEdit";
import ImageBlock from "./ImageBlock";
import {v4 as uuidv4} from 'uuid';


function App() {
    const [images, setImage] = useState([
        {
            id: uuidv4(),
            url: 'https://gdb.rferl.org/CE5A87A3-AB32-4DE3-AD8F-806B5D92548C_w1200_r1.jpg',
            title: 'parlament european',
            setForEdit: false
        }
    ])

    function setUrl(url, id) {
        setImage(images.map(img => {
            if (img.id === id) {
                img.url = url;
            }
            return img;
        }))
    }

    function setTitle(title, id) {
        setImage(images.map(img => {
            if (img.id === id) {
                img.title = title;
            }
            return img;
        }))
    }

    const list = images && (
        <ul className="flex flex-col w-full items-stretch">
            {images.map((image, index) =>
                <ImageBlock key={index}
                            image={image}
                            setUrl={setUrl}
                            setTitle={setTitle}
                />)}
        </ul>
    )

    function addNewBlock() {
        setImage([...images, {
            id: uuidv4(),
            url: 'http://www.infotag.md/data/531/59417_eco.l.jpg',
            title: '',
            setForEdit: false
        }])
    }

    return (
        // container
        <div className="w-10/12 mx-auto bg-gray-100 min-h-screen p-2 flex">
            {/* content-side*/}
            <div className="w-8/12 border-r p-2 flex flex-col">
                {/*img-form-block*/}
                {list}
                <div className='w-10/12 mx-auto border border-white text-center text-2xl text-white rounded shadow cursor-pointer hover:bg-gray-200'
                     title="Add new block"
                     onClick={addNewBlock}
                >
                    +
                </div>
            </div>
            {/* sidebar*/}
            <div className="w-4/12 pl-2">
                <ImageEdit src/>
            </div>
        </div>
    );
}

export default App;
