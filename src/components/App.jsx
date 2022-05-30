import '../App.css';
import {useState} from "react";
import ImageBlock from "./ImageBlock";
import {v4 as uuidv4} from 'uuid';
import Modal from "./Modal";
import React from "react";
import {saveAs} from "file-saver";

function App() {
    const [showModal, setShowModal] = useState(false);

    const [images, setImages] = useState([
        {
            id: uuidv4(),
            url: '',
            title: '',
            editMode: false,
            cropped: false,
            section: {
                unit: '%',
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
    ])

    function addBlock() {
        setImages([...images, {
            id: uuidv4(),
            url: '',
            title: '',
            editMode: false,
            cropped: false,
            section: {
                unit: '%',
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }])
    }

    function setUrl(url, id) {
        setImages(images.map(img => {
            if (img.id === id) {
                img.url = url;
                img.section = {}
            }
            return img;
        }))
    }

    function setTitle(title, id) {
        setImages(images.map(img => {
            if (img.id === id) {
                img.title = title;
            }
            return img;
        }))
    }

    function changeEditMode(id) {
        setImages(images.map(img => {
            // change editMode to true for clicked image and false for other images
            img.editMode = img.id === id;
            return img;
        }))
        setShowModal(true)
    }

    function cropHandler(section) {
        const new_images = images.map(image => {
            if (image.editMode) {
                image.cropped = true;
                image.section = section;
            }
            return image;
        })
        setImages(new_images)
    }

    const [image_to_edit] = images.filter(image => image.editMode)

    function deleteBox(id) {
        setImages(images.filter(image => image.id !== id))
    }

    function calculateCanvasSpace(imgElement, image){
        console.log('section ', image.section)
        let x,y, canvasWidth, canvasHeight;
        if(image.cropped){
            x = image.section.x / 100 * imgElement.naturalWidth;
            y = image.section.y / 100 * imgElement.naturalHeight;
            canvasWidth = Math.floor((image.section.width) / 100 * imgElement.naturalWidth);
            canvasHeight = Math.floor((image.section.height) / 100 * imgElement.naturalHeight);
        } else {
            x=0;
            y=0;
            canvasWidth = imgElement.naturalWidth;
            canvasHeight = imgElement.naturalHeight;
        }
        return [x, y, canvasWidth, canvasHeight]
    }

    function toDataURL(image, callback, outputFormat) {
        const proxy = 'https://quiet-stream-71977.herokuapp.com/';

        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            let canvas = document.createElement('CANVAS');
            canvas.style.border = '1px solid red'
            let ctx = canvas.getContext('2d');
            let [x, y, canvasWidth, canvasHeight] = calculateCanvasSpace(this, image);
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.drawImage(this, x, y, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
            let dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = proxy+image.url;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = image.url;
        }
    }

    function downloadImages() {
        images.forEach(image => {
            toDataURL(image, function(data){
                let title = image.title !== '' ? image.title : image.id;

                saveAs(data, `${title}.jpg`)
            }, 'image/jpeg')
        })
    }

    return (
        // container
        <div className="w-10/12 mx-auto bg-white shadow-lg min-h-screen max-w-5xl p-2 flex justify-center">
            {/* content */}
            <div className="w-full p-2 flex flex-col">
                <div className='flex items-center justify-start -ml-48'>
                    <button className='bg-green-300 hover:bg-green-400 shadow-lg hover:shadow-xs px-3 py-2 text-white text-xl rounded-xl border border-green-500 absolute top-10 left-10'
                            onClick={downloadImages}  hidden={!images.length || images[0]?.url === ''}>Save images</button>
                </div>

                <Modal image={image_to_edit} isVisible={showModal} crop={section => cropHandler(section)}
                       hideModal={() => setShowModal(false)}/>
                {images && (<ul className="flex flex-col mx-auto items-stretch w-10/12">
                    {images.length ? (images.map((image) =>
                        <ImageBlock key={image.id}
                                    image={image}
                                    setUrl={setUrl}
                                    setTitle={setTitle}
                                    edit={() => changeEditMode(image.id)}
                                    delete={(id) => deleteBox(id)}
                        />
                    )) : (
                        <li className="flex p-2 border border-gray-300 mb-1 bg-gray-100 rounded-lg items-center justify-center">
                            Create Image Block first
                        </li>)}
                </ul>)}

                <div
                    className='w-8/12 mx-auto border border-indigo-300 py-2 text-center text-2xl text-indigo-400 rounded-lg shadow cursor-pointer hover:bg-indigo-200'
                    title="Add new block"
                    onClick={addBlock}
                > +
                </div>

            </div>
        </div>
    );
}

export default App;
