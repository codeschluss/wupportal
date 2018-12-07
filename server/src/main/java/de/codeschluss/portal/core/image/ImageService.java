package de.codeschluss.portal.core.image;

import java.awt.image.BufferedImage;
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

  
  /**
   * Prepare.
   *
   * @param imageFile the image file
   * @return the byte[]
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public byte[] prepare(MultipartFile imageFile) throws IOException {
    BufferedImage imageBuff = ImageIO.read(imageFile.getInputStream());
    
    return null;
  }
  
  
}
