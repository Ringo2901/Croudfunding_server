const MediaService = require('../services/MediaService');

class MediaController {
    async uploadMedia(req, res) {
        try {
            const { projectId } = req.params;

            if (!projectId || !req.body) {
                return res.status(400).json({ message: 'Не указан projectId или отсутствует файл' });
            }

            const media = await MediaService.uploadAndSaveMedia(req.file.path, projectId);

            return res.status(201).json({
                message: 'Медиафайл успешно загружен',
                media,
            });
        } catch (error) {
            console.error('Ошибка в MediaController:', error);
            return res.status(500).json({
                message: 'Ошибка при загрузке медиафайла',
                error: error.message,
            });
        }
    }

    async getMediaByProjectId(req, res) {
        try {
            const { projectId } = req.params;

            if (!projectId) {
                return res.status(400).json({ message: 'Не указан projectId' });
            }

            const mediaFiles = await MediaService.getMediaByProjectId(projectId);

            return res.status(200).json(mediaFiles);
        } catch (error) {
            console.error('Ошибка при получении медиа:', error);
            return res.status(500).json({
                message: 'Ошибка при получении медиафайлов',
                error: error.message,
            });
        }
    }
}

module.exports = new MediaController();
