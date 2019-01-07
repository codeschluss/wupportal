package de.codeschluss.portal.core.image;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

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
   * @param imageData
   *          the image file
   * @return the byte[]
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public byte[] resize(byte[] imageData) throws IOException {
    if (imageData == null || imageData.length == 1) {
      return null;
    }

    ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
    BufferedImage imageBuff = ImageIO.read(bais);
    Image image = imageBuff.getScaledInstance(config.getMaxWidth(), config.getMaxWidth(),
        Image.SCALE_SMOOTH);

    BufferedImage bimage = new BufferedImage(image.getWidth(null), image.getHeight(null),
        BufferedImage.TYPE_4BYTE_ABGR);

    Graphics2D graphics = bimage.createGraphics();
    graphics.drawImage(image, 0, 0, null);
    graphics.dispose();

    return ((DataBufferByte) bimage.getData().getDataBuffer()).getData();
  }

}
