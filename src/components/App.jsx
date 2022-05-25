import '../App.css';
import {useState} from "react";
import ImageBlock from "./ImageBlock";
import {v4 as uuidv4} from 'uuid';
import Modal from "./Modal";
import React from "react";


function App() {
    const [showModal, setShowModal] = useState(false);

    const [image_edit, setImage_edit] = useState({
        title: null,
        url: '',
        // url: 'https://www.businesswest.co.uk/sites/default/files/styles/event_image/public/blog/featured/shutterstock_439601284_1.jpg?itok=a47EPijY'
    })
    const [images, setImage] = useState([
        // {
        //     id: uuidv4(),
        //     url: '',
        //     title: '',
        //     editMode: false
        // }
        {
            id: uuidv4(),
            url: 'https://www.businesswest.co.uk/sites/default/files/styles/event_image/public/blog/featured/shutterstock_439601284_1.jpg?itok=a47EPijY',
            title: 'parlament european',
            editMode: false
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

    function changeEditMode(id) {
        setImage(images.map(img => {
            img.editMode = img.id === id;
            if (img.id === id) {
                setImage_edit({
                    title: img.title,
                    url: img.url
                })
            }
            return img;
        }))
        setShowModal(true)
    }

    const list = images && (
        <ul className="flex flex-col w-full items-stretch">
            {images.length ? (images.map((image) =>
                <ImageBlock key={image.id}
                            image={image}
                            setUrl={setUrl}
                            setTitle={setTitle}
                            edit={() => changeEditMode(image.id)}
                />)) :
                (<li className="flex p-2 border border-gray-300 mb-1 bg-gray-100 rounded-lg items-center justify-center">
                    Create Image Block first
                </li>)}
        </ul>
    )

    function addBlock() {
        setImage([...images, {
            id: uuidv4(),
            url: '',
            title: '',
            editMode: false
        }])
    }

    return (
        // container
        <div className="w-10/12 mx-auto bg-white shadow-lg min-h-screen max-w-5xl p-2 flex justify-center">
            {/* content */}
            <div className="w-full p-2 flex flex-col">
                <Modal image={image_edit} isVisible={showModal} hideModal={()=>setShowModal(false)}/>
                {/*img-form-block*/}
                {list}
                <div
                    className='w-10/12 mx-auto border border-indigo-300 py-2 text-center text-2xl text-indigo-400 rounded-lg shadow cursor-pointer hover:bg-indigo-200'
                    title="Add new block"
                    onClick={addBlock}
                >
                    +
                </div>
            </div>
             {/*sidebar*/}
            {/*<div className="w-4/12 pl-2">*/}
            {/*    <ImageEdit src={image_edit}/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
