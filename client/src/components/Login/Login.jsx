import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios
import UseContext from '../context/UseContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate();
    const {setUser} = useContext(UseContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });
            const { token } = response.data;

            // Store the token (e.g., in localStorage)
            localStorage.setItem('token', token);

            console.log(response.data.user);
           setUser(response.data.user);
            
           
            // Redirect to the profile page or another protected route
            navigate('/home');
        } catch (err) {
            setError('Invalid email or password'); // Handle error message
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 mb-10 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
