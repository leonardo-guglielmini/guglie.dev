import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/*STYLE*/
import style from './Homepage.module.css';

/*COMPONENTS*/
import CustomSlider from '../../components/CustomSlider/CustomSlider';

const baseFormData = {
    name: '',
    email: '',
    message: ''
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function Homepage() {

    const [formData, setFormData] = useState(baseFormData);
    const [isSending, setIsSending] = useState(false)
    const [status, setStatus] = useState("")
    const [captchaValue, setCaptchaValue] = useState(null)

    function handleFormData(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        })
        )
    }

    const handleCaptcha = (value) => {
        setCaptchaValue(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            alert("Please complete the CAPTCHA.");
            return;
        }
        setIsSending(true);

        const requestData = {
            ...formData,
            captcha: captchaValue
        }

        try {
            const response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (response.ok) {
                setStatus("Email sent successfully!");
                setFormData(baseFormData);
            } else {
                setStatus(`Failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("Failed to send email.");
        }

        setIsSending(false);
    }


    return (
        <div className='flex flex-col min-h-screen'>
            <section className={`${style.hero} bg-red-500`}>
                <div className='container mx-auto'>
                    <CustomSlider />
                </div>
            </section>
            <section className={`${style.content} bg-blue-500 grow`}>
                <div className='container mx-auto'>
                    <div className='flex justify-between'>
                        <img src="" alt="stock-1" />
                        <div>
                            <h3>Macro text</h3>
                            <p>Paragraph</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <h3>Macro text</h3>
                            <p>Paragraph</p>
                        </div>
                        <img src="" alt="stock-1" />
                    </div>
                </div>
            </section>
            <section className={`${style.contact} bg-green-500`}>
                <div className='container mx-auto'>
                    <form action="submit" className='flex justify-center' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor="name">Nome: </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                name="name"
                                required
                                className='bg-purple-500'
                                onChange={handleFormData}
                            />
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                name="email"
                                required
                                className='bg-purple-500'
                                onChange={handleFormData}
                            />
                        </div>
                        <label htmlFor="message">Message: </label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            cols="30" rows="3"
                            required
                            className='bg-purple-500'
                            onChange={handleFormData}
                        />
                        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptcha} />
                        <button>Submit</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </section>
        </div>
    )
}