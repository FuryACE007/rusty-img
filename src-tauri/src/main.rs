// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use image::{DynamicImage, GenericImageView};
use base64;
use std::fs::File;
use std::io::Write;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    blur,
    brighten,
    crop,
    rotate,
    invert,
    ascii_art,
    fractal
  ])
    .run(tauri::generate_context!())
    .expect("error while running the application");
}

#[tauri::command]
fn blur(infile: Vec<u8>, blur_amt: f32) {
    let img = image::load_from_memory(&infile).expect("Failed to load input image.");
    let img2 = img.blur(blur_amt);

    // Generate the output file path
    let output_file = format!("blurred.png");

    img2.save(&output_file).expect("Failed writing blurred image file.");
}

#[tauri::command]
fn brighten(infile: String, brighten_value: i32) {
    let infile_bytes = base64::decode(infile).expect("Failed to decode input file data.");
    let img = image::load_from_memory(&infile_bytes).expect("Failed to load input image.");
    let img2 = img.brighten(brighten_value);

    let output_file = format!("brighten.png");

    img2.save(&output_file).expect("Failed writing brighten image file.");
}


#[tauri::command]
fn crop(infile: String, x: u32, y: u32, width: u32, height: u32) {
  let infile_bytes = base64::decode(infile).expect("Failed to decode input file data.");

  let mut img = image::load_from_memory(&infile_bytes).expect("Failed to load input image.");
  let img2 = img.crop(x, y, width, height);

  let output_file = format!("cropped.png");

  img2.save(&output_file).expect("Failed writing brighten image file.");}

#[tauri::command]
fn rotate(infile: String, rotation_value: u32) {
  let infile_bytes = base64::decode(infile).expect("Failed to decode input file data.");

  let img = image::load_from_memory(&infile_bytes).expect("Failed to load input image.");
  let img2 ;

  if rotation_value >= 90 && rotation_value < 180 {
     img2 = img.rotate90();
  } else if rotation_value >= 180 && rotation_value < 270{
      img2 = img.rotate180();
  } else if rotation_value >= 270 {
      img2 = img.rotate270();
  } else {
      println!("Invalid rotation value ( choose either 90 or 180 or 270 )");
      std::process::exit(1);
  }

  let output_file = format!("rotated.png");

  img2.save(&output_file).expect("Failed writing rotated image file.");}


#[tauri::command]
fn invert(infile: String) {
  let infile_bytes = base64::decode(infile).expect("Failed to decode input file data.");

  let mut img = image::load_from_memory(&infile_bytes).expect("Failed to load input image.");

  img.invert();
  let output_file = format!("inverted.png");

  img.save(&output_file).expect("Failed writing rotated image file.");
}

fn get_str_ascii(intent: u8) -> &'static str {
  let index = intent / 32;
  let ascii = [" ", ".", ",", "-", "~", "+", "=", "@"];
  ascii[index as usize]
}

#[tauri::command]
fn ascii_art(dir: String, scale: u32) {
  let infile_bytes = base64::decode(&dir).expect("Failed to decode input file data.");
  let img = image::load_from_memory(&infile_bytes).expect("Failed to load input image.");
  let (width, height) = img.dimensions();
  let mut result = String::new();

  for y in (0..height).step_by((scale * 2) as usize) {
      for x in (0..width).step_by(scale as usize) {
          let pix = img.get_pixel(x, y);
          let mut intent = (pix[0] / 3 + pix[1] / 3 + pix[2] / 3) as u8;
          if pix[3] == 0 {
              intent = 0;
          }
          result.push_str(get_str_ascii(intent));
      }
      result.push('\n');
  }

  let output_file = "asciiart.txt";
  std::fs::write(output_file, result).expect("Failed to write to output file.");
}

#[tauri::command]
fn fractal() {
  let width = 800;
  let height = 800;

  let mut imgbuf = image::ImageBuffer::new(width, height);

  let scale_x = 3.0 / width as f32;
  let scale_y = 3.0 / height as f32;

  // Iterate over the coordinates and pixels of the image
  for (x, y, pixel) in imgbuf.enumerate_pixels_mut() {
      // Use red and blue to be a pretty gradient background
      let red = (0.3 * x as f32) as u8;
      let blue = (0.3 * y as f32) as u8;

      // Use green as the fractal foreground (here is the fractal math part)
      let cx = y as f32 * scale_x - 1.5;
      let cy = x as f32 * scale_y - 1.5;

      let c = num_complex::Complex::new(-0.4, 0.6);
      let mut z = num_complex::Complex::new(cx, cy);

      let mut green = 0;
      while green < 255 && z.norm() <= 2.0 {
          z = z * z + c;
          green += 1;
      }

      *pixel = image::Rgb([red, green, blue]);
  }
  let output_file = format!("fractal.png");

  imgbuf.save(output_file).unwrap();
}
