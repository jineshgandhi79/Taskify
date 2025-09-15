import jwt from 'jsonwebtoken';

function sendTokenCookie(res, token) {
    res.cookie("accessToken", token, {
        // httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
    });
}

function generateAccessToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' });
}
    

export {sendTokenCookie,generateAccessToken};