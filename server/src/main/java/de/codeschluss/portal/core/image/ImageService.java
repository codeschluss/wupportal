package de.codeschluss.portal.core.image;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * The Class ImageService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ImageService {

  private final ImageConfiguration config;

  public ImageService(ImageConfiguration config) {
    this.config = config;
  }

  /**
   * Resize.
   *
   * @param imageFile
   *          the image file
   * @return the byte[]
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public byte[] resize(MultipartFile imageFile) throws IOException {
    BufferedImage imageBuff = ImageIO.read(imageFile.getInputStream());
    Image image = imageBuff.getScaledInstance(config.getMaxWidth(), -1, Image.SCALE_SMOOTH);

    BufferedImage bimage = new BufferedImage(image.getWidth(null), image.getHeight(null),
        BufferedImage.TYPE_3BYTE_BGR);

    Graphics2D neGraphic = bimage.createGraphics();
    neGraphic.drawImage(image, 0, 0, null);
    neGraphic.dispose();

    return ((DataBufferByte) bimage.getData().getDataBuffer()).getData();
  }

}
