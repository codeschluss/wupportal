package de.codeschluss.portal.core.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
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
   * @param image the image
   * @param formatType the format type
   * @return the byte[]
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public byte[] resize(byte[] image, String formatType) throws IOException {
    if (image == null || image.length == 1) {
      return null;
    }

    ByteArrayInputStream inputStream = new ByteArrayInputStream(image);
    BufferedImage imageBuff = ImageIO.read(inputStream);
    
    if (imageBuff.getHeight() <= config.getMaxHeight()
        && imageBuff.getWidth() <= config.getMaxWidth()) {
      return image;
    }
    BufferedImage resized = Scalr.resize(
        imageBuff, Method.ULTRA_QUALITY, config.getMaxWidth(), config.getMaxWidth());
    
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    ImageIO.write(resized, formatType, outputStream);
    return outputStream.toByteArray();
  }

}
