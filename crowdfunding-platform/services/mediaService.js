const { Media } = require('../models');
const { v2: cloudinary } = require('cloudinary');

class MediaService {
    constructor() {
        cloudinary.config({
            cloud_name: 'htgrdsgqe',
            api_key: '116732983232387',
            api_secret: '3rdXlAGcoWfo3RUEs6Y8g2n_dSw',
        });
    }

    async uploadAndSaveMedia(file, projectId) {
        try {
            const uploadResult = await cloudinary.uploader.upload(file, {
                folder: 'project_media',
                resource_type: 'image',
            });

            if (!uploadResult || !uploadResult.secure_url) {
                throw new Error('Ошибка при загрузке файла в Cloudinary');
            }

            return await Media.create({
                file_path: uploadResult.secure_url,
                uploaded_at: new Date(),
                project_id: projectId,
            });
        } catch (error) {
            console.error('Ошибка при загрузке и сохранении медиа:', error);
            throw error;
        }
    }

    async getMediaByProjectId(projectId) {
        try {
            return await Media.findAll({
                where: { project_id: projectId },
                order: [['uploaded_at', 'DESC']],
            });
        } catch (error) {
            console.error('Ошибка при получении медиафайлов:', error);
            throw error;
        }
    }
}

module.exports = new MediaService();
