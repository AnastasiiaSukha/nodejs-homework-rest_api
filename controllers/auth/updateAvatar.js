const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    try {
        const updateImg = await Jimp.read(tempUpload);
        updateImg
            .autocrop()
            .cover(
                250,
                250,
                Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
            )
            .writeAsync(tempUpload);

        const resultUpload = path.join(avatarsDir, fileName);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl = path.join("avatars", fileName);
        await User.findByIdAndUpdate(_id, { avatarUrl });

        res.json({
            avatarUrl,
        })
    }catch (error) {
    await fs.unlink(tempUpload);
    throw error;
    };

}

module.exports = updateAvatar;